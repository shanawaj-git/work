CREATE TABLE insurance(
id DOUBLE NOT NULL,
id DOUBLE NOT NULL,
policyNumber DOUBLE NOT NULL,
provider VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (prescriptionNumber) REFERENCES patient(id)
)

CREATE TABLE doctor(
prescriptionNumber DOUBLE NOT NULL,
id DOUBLE NOT NULL,
email VARCHAR(50) NOT NULL,
mobile VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (prescriptionNumber) REFERENCES prescription(prescriptionNumber)
)

CREATE TABLE dosage(
name VARCHAR(50) NOT NULL,
frequency DOUBLE NOT NULL,
unit VARCHAR(50) NOT NULL,
period DOUBLE NOT NULL,
route VARCHAR(50) NOT NULL,
quantity DOUBLE NOT NULL,
doctorNotes VARCHAR(50) NOT NULL,
timeUnit VARCHAR(50) NOT NULL,
PRIMARY KEY (frequency),
FOREIGN KEY (prescriptionNumber) REFERENCES drugs(name)
)

CREATE TABLE address(
id DOUBLE NOT NULL,
addressLine1 VARCHAR(50) NOT NULL,
addressLine2 VARCHAR(50) NOT NULL,
area VARCHAR(50) NOT NULL,
city VARCHAR(50) NOT NULL,
state VARCHAR(50) NOT NULL,
postalCode VARCHAR(50) NOT NULL,
type VARCHAR(50) NOT NULL,
country VARCHAR(50) NOT NULL,
PRIMARY KEY (addressLine1),
FOREIGN KEY (prescriptionNumber) REFERENCES patient(id)
)

CREATE TABLE prescription(
prescriptionNumber DOUBLE NOT NULL,
recordNumber DOUBLE NOT NULL,
visitDate VARCHAR(50) NOT NULL,
diagnosis VARCHAR(50) NOT NULL,
pin VARCHAR(50) NOT NULL,
PRIMARY KEY (prescriptionNumber))

CREATE TABLE drugs(
prescriptionNumber DOUBLE NOT NULL,
name VARCHAR(50) NOT NULL,
PRIMARY KEY (name),
FOREIGN KEY (prescriptionNumber) REFERENCES prescription(prescriptionNumber)
)

CREATE TABLE patient(
prescriptionNumber DOUBLE NOT NULL,
id DOUBLE NOT NULL,
EID DOUBLE NOT NULL,
MOH-ID DOUBLE NOT NULL,
email VARCHAR(50) NOT NULL,
mobile VARCHAR(50) NOT NULL,
dob VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (prescriptionNumber) REFERENCES prescription(prescriptionNumber)
)

CREATE TABLE name(
id DOUBLE NOT NULL,
first VARCHAR(50) NOT NULL,
middle VARCHAR(50) NOT NULL,
last VARCHAR(50) NOT NULL,
PRIMARY KEY (first),
FOREIGN KEY (prescriptionNumber) REFERENCES doctor(id)
)
