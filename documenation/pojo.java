// import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
// import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
/* ObjectMapper om = new ObjectMapper();
Root root = om.readValue(myJsonString, Root.class); */
public class Dosage{
    public String frequency;
    public String unit;
    public String period;
    public String route;
    public String quantity;
    public String doctorNotes;
    public String timeUnit;
}

public class Drug{
    public String name;
    public Dosage dosage;
}

public class Name{
    public String first;
    public String middle;
    public String last;
}

public class Address{
    public String addressLine1;
    public String addressLine2;
    public String area;
    public String city;
    public String state;
    public String postalCode;
    public String type;
    public String country;
}

public class Insurance{
    public int id;
    public int policyNumber;
    public String provider;
}

public class Patient{
    public String id;
    @JsonProperty("EID") 
    public String eID;
    @JsonProperty("MOH-ID") 
    public String mOHID;
    public Name name;
    public String email;
    public String mobile;
    public Date dob;
    public ArrayList<Address> address;
    public Insurance insurance;
}

public class Doctor{
    public String id;
    public Name name;
    public String email;
    public String mobile;
}

public class Prescription{
    public String prescriptionNumber;
    public String recordNumber;
    public Date visitDate;
    public String diagnosis;
    public ArrayList<Drug> drugs;
    public String pin;
    public Patient patient;
    public Doctor doctor;
}

