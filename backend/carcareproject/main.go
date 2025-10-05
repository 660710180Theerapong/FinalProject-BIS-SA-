package main

import(
	"fmt"
	"os"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type Applicant struct {
	ID        	int       	`json:"id"`
	FirstName 	string    	`json:"first_name"`
	LastName    string    	`json:"last_name"`
	EMAIL      	string    	`json:"email"`
	PHONE      	string      `json:"phone"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

func getEnv(key, defaultValue string) string{
	if value := os.Getenv(key); value != ""{
		return value
	}
	return defaultValue 
}

//conect db
var db *sql.DB

func initDB(){
	var err error
	host := getEnv("DB_HOST", "")
	name := getEnv("DB_NAME", "")
	user := getEnv("DB_USER","")
	password := getEnv("DB_PASSWORD","")
	port := getEnv("DB_PORT","")

	conSt := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, name)

	db, err = sql.Open("postgres", conSt)
	if err !=nil {
		log.Fatal("failed to open database")
	}
	
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	log.Print("successfully connect to database")

	// กำหนดจำนวน Connection สูงสุด
	db.SetMaxOpenConns(25)

	// กำหนดจำนวน Idle connection สูงสุด
	db.SetMaxIdleConns(20)

	// กำหนดอายุของ Connection
	db.SetConnMaxLifetime(5 * time.Minute)
}

func getAllApplicants(c *gin.Context) {
    var rows *sql.Rows
    var err error
    // ลูกค้าถาม "มีหนังสืออะไรบ้าง"
    rows, err = db.Query("SELECT id, first_name, last_name, email, phone, created_at, updated_at FROM applicants")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var applicants []Applicant
    for rows.Next() {
        var applicant Applicant
        err := rows.Scan(&applicant.ID, &applicant.FirstName, &applicant.LastName, &applicant.EMAIL, &applicant.PHONE, &applicant.CreatedAt, &applicant.UpdatedAt)
        if err != nil {
        }
        applicants = append(applicants, applicant)
    }
	if applicants == nil {
		applicants = []Applicant{}
	}

	c.JSON(http.StatusOK, applicants)
}

func getApplicant(c *gin.Context) {
    id := c.Param("id")
    var applicant Applicant

    // QueryRow ใช้เมื่อคาดว่าจะได้ผลลัพธ์ 0 หรือ 1 แถว
    err := db.QueryRow("SELECT id, first_name, last_name, email, phone FROM books WHERE id = $1", id).
        Scan(&applicant.ID, &applicant.FirstName, &applicant.LastName, &applicant.EMAIL, &applicant.PHONE)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "applicant not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, applicant)
}

func createApplicant(c *gin.Context) {
    var newApplicant Applicant

    if err := c.ShouldBindJSON(&newApplicant); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ใช้ RETURNING เพื่อดึงค่าที่ database generate (id, timestamps)
    var id int
    var createdAt, updatedAt time.Time

    err := db.QueryRow(
        `INSERT INTO Applicants (first_name, last_name, email, phone)
         VALUES ($1, $2, $3, $4)
         RETURNING id, created_at, updated_at`,
        newApplicant.FirstName, newApplicant.LastName, newApplicant.EMAIL, newApplicant.PHONE,
    ).Scan(&id, &createdAt, &updatedAt)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    newApplicant.ID = id
    newApplicant.CreatedAt = createdAt
    newApplicant.UpdatedAt = updatedAt

    c.JSON(http.StatusCreated, newApplicant) // ใช้ 201 Created
}

func updateApplicant(c *gin.Context) {
    var ID int
    id := c.Param("id")
    var updateApplicant Applicant

    if err := c.ShouldBindJSON(&updateApplicant); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var updatedAt time.Time
    err := db.QueryRow(
        `UPDATE Applicants
         SET first_name = $1, last_name = $2, email = $3, phone = $4
         WHERE id = $6
         RETURNING ID,updated_at`,
        updateApplicant.FirstName, updateApplicant.LastName, updateApplicant.EMAIL,
        updateApplicant.PHONE, id,
    ).Scan(&ID, &updateApplicant)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "Applicant not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    updateApplicant.ID = ID
	updateApplicant.UpdatedAt = updatedAt
	c.JSON(http.StatusOK, updateApplicant)
}

func deleteApplicant(c *gin.Context) {
    id := c.Param("id")

    result, err := db.Exec("DELETE FROM Applicants WHERE id = $1", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Applicant not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Applicant deleted successfully"})
}

func main(){
	initDB()
	defer db.Close()

	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		err := db.Ping()
		if err != nil{
			c.JSON(http.StatusServiceUnavailable, gin.H{"message":"unhealty", "error":err})
			return
		}
		c.JSON(200, gin.H{"message": "healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/applicants", getAllApplicants)
	 	api.GET("/applicants/:id", getApplicant)
	 	api.POST("/applicants", createApplicant)
	 	api.PUT("/applicants/:id", updateApplicant)
	 	api.DELETE("/applicants/:id", deleteApplicant)
	 }

	r.Run(":8080")
}






