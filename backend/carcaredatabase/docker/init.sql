-- สร้างตาราง books
CREATE TABLE applicants (
	applicant_id PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	email VARCHAR(50) NOT NULL,
	phon VARCHAR(10) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE apply (
	apply_id PRIMARY KEY,
	position VARCHAR(100) NOT NULL,
	file BYTEA,
	stage VARCHAR(50),
	FORENCES KEY applicant_id REFERANCE applicants,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hr (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	email VARCHAR(50) NOT NULL,
	phon VARCHAR(10) NOT NULL,
	
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- สร้าง function สำหรับอัพเดท updated_at โดยอัตโนมัติ
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger เพื่อเรียกใช้ function update_modified_column
CREATE TRIGGER update_applicants_modtime
BEFORE UPDATE ON applicants
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

; -- สร้าง index บน title เพื่อเพิ่มประสิทธิภาพการค้นหา
; CREATE INDEX idx_applicants_title ON books(title);

-- เพิ่มข้อมูล hr
INSERT INTO books (first_name, last_name, email, phon) VALUES
    ('Theerapong', 'Poonkwan', 'mofudon@gmail.com', '0922561234'),
    ('Theerapong', 'rawansa', 'nnnn@gmail.com', '0251234567'),
    ('Nutkamol', 'Piriyatanasrub', 'monnie@gmail.com', '032123578');
