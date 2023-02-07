-----------------------------------com.albatha.nexthealth.prescription.dto.Address.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"addressLine1",
"addressLine2",
"area",
"city",
"state",
"postalCode",
"type",
"country"
})
@Generated("jsonschema2pojo")
public class Address {

@JsonProperty("addressLine1")
private String addressLine1;
@JsonProperty("addressLine2")
private String addressLine2;
@JsonProperty("area")
private String area;
@JsonProperty("city")
private String city;
@JsonProperty("state")
private String state;
@JsonProperty("postalCode")
private String postalCode;
@JsonProperty("type")
private String type;
@JsonProperty("country")
private String country;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("addressLine1")
public String getAddressLine1() {
return addressLine1;
}

@JsonProperty("addressLine1")
public void setAddressLine1(String addressLine1) {
this.addressLine1 = addressLine1;
}

@JsonProperty("addressLine2")
public String getAddressLine2() {
return addressLine2;
}

@JsonProperty("addressLine2")
public void setAddressLine2(String addressLine2) {
this.addressLine2 = addressLine2;
}

@JsonProperty("area")
public String getArea() {
return area;
}

@JsonProperty("area")
public void setArea(String area) {
this.area = area;
}

@JsonProperty("city")
public String getCity() {
return city;
}

@JsonProperty("city")
public void setCity(String city) {
this.city = city;
}

@JsonProperty("state")
public String getState() {
return state;
}

@JsonProperty("state")
public void setState(String state) {
this.state = state;
}

@JsonProperty("postalCode")
public String getPostalCode() {
return postalCode;
}

@JsonProperty("postalCode")
public void setPostalCode(String postalCode) {
this.postalCode = postalCode;
}

@JsonProperty("type")
public String getType() {
return type;
}

@JsonProperty("type")
public void setType(String type) {
this.type = type;
}

@JsonProperty("country")
public String getCountry() {
return country;
}

@JsonProperty("country")
public void setCountry(String country) {
this.country = country;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Doctor.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"id",
"name",
"email",
"mobile"
})
@Generated("jsonschema2pojo")
public class Doctor {

@JsonProperty("id")
private String id;
@JsonProperty("name")
private Name__1 name;
@JsonProperty("email")
private String email;
@JsonProperty("mobile")
private String mobile;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("id")
public String getId() {
return id;
}

@JsonProperty("id")
public void setId(String id) {
this.id = id;
}

@JsonProperty("name")
public Name__1 getName() {
return name;
}

@JsonProperty("name")
public void setName(Name__1 name) {
this.name = name;
}

@JsonProperty("email")
public String getEmail() {
return email;
}

@JsonProperty("email")
public void setEmail(String email) {
this.email = email;
}

@JsonProperty("mobile")
public String getMobile() {
return mobile;
}

@JsonProperty("mobile")
public void setMobile(String mobile) {
this.mobile = mobile;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Dosage.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"frequency",
"unit",
"period",
"route",
"quantity",
"doctorNotes",
"timeUnit"
})
@Generated("jsonschema2pojo")
public class Dosage {

@JsonProperty("frequency")
private String frequency;
@JsonProperty("unit")
private String unit;
@JsonProperty("period")
private String period;
@JsonProperty("route")
private String route;
@JsonProperty("quantity")
private String quantity;
@JsonProperty("doctorNotes")
private String doctorNotes;
@JsonProperty("timeUnit")
private String timeUnit;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("frequency")
public String getFrequency() {
return frequency;
}

@JsonProperty("frequency")
public void setFrequency(String frequency) {
this.frequency = frequency;
}

@JsonProperty("unit")
public String getUnit() {
return unit;
}

@JsonProperty("unit")
public void setUnit(String unit) {
this.unit = unit;
}

@JsonProperty("period")
public String getPeriod() {
return period;
}

@JsonProperty("period")
public void setPeriod(String period) {
this.period = period;
}

@JsonProperty("route")
public String getRoute() {
return route;
}

@JsonProperty("route")
public void setRoute(String route) {
this.route = route;
}

@JsonProperty("quantity")
public String getQuantity() {
return quantity;
}

@JsonProperty("quantity")
public void setQuantity(String quantity) {
this.quantity = quantity;
}

@JsonProperty("doctorNotes")
public String getDoctorNotes() {
return doctorNotes;
}

@JsonProperty("doctorNotes")
public void setDoctorNotes(String doctorNotes) {
this.doctorNotes = doctorNotes;
}

@JsonProperty("timeUnit")
public String getTimeUnit() {
return timeUnit;
}

@JsonProperty("timeUnit")
public void setTimeUnit(String timeUnit) {
this.timeUnit = timeUnit;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Drug.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"name",
"dosage"
})
@Generated("jsonschema2pojo")
public class Drug {

@JsonProperty("name")
private String name;
@JsonProperty("dosage")
private Dosage dosage;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("name")
public String getName() {
return name;
}

@JsonProperty("name")
public void setName(String name) {
this.name = name;
}

@JsonProperty("dosage")
public Dosage getDosage() {
return dosage;
}

@JsonProperty("dosage")
public void setDosage(Dosage dosage) {
this.dosage = dosage;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Insurance.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"id",
"policyNumber",
"provider"
})
@Generated("jsonschema2pojo")
public class Insurance {

@JsonProperty("id")
private Integer id;
@JsonProperty("policyNumber")
private Integer policyNumber;
@JsonProperty("provider")
private String provider;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("id")
public Integer getId() {
return id;
}

@JsonProperty("id")
public void setId(Integer id) {
this.id = id;
}

@JsonProperty("policyNumber")
public Integer getPolicyNumber() {
return policyNumber;
}

@JsonProperty("policyNumber")
public void setPolicyNumber(Integer policyNumber) {
this.policyNumber = policyNumber;
}

@JsonProperty("provider")
public String getProvider() {
return provider;
}

@JsonProperty("provider")
public void setProvider(String provider) {
this.provider = provider;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Name.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"first",
"middle",
"last"
})
@Generated("jsonschema2pojo")
public class Name {

@JsonProperty("first")
private String first;
@JsonProperty("middle")
private String middle;
@JsonProperty("last")
private String last;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("first")
public String getFirst() {
return first;
}

@JsonProperty("first")
public void setFirst(String first) {
this.first = first;
}

@JsonProperty("middle")
public String getMiddle() {
return middle;
}

@JsonProperty("middle")
public void setMiddle(String middle) {
this.middle = middle;
}

@JsonProperty("last")
public String getLast() {
return last;
}

@JsonProperty("last")
public void setLast(String last) {
this.last = last;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Name__1.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"first",
"middle",
"last"
})
@Generated("jsonschema2pojo")
public class Name__1 {

@JsonProperty("first")
private String first;
@JsonProperty("middle")
private String middle;
@JsonProperty("last")
private String last;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("first")
public String getFirst() {
return first;
}

@JsonProperty("first")
public void setFirst(String first) {
this.first = first;
}

@JsonProperty("middle")
public String getMiddle() {
return middle;
}

@JsonProperty("middle")
public void setMiddle(String middle) {
this.middle = middle;
}

@JsonProperty("last")
public String getLast() {
return last;
}

@JsonProperty("last")
public void setLast(String last) {
this.last = last;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.Patient.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"id",
"EID",
"MOH-ID",
"name",
"email",
"mobile",
"dob",
"address",
"insurance"
})
@Generated("jsonschema2pojo")
public class Patient {

@JsonProperty("id")
private String id;
@JsonProperty("EID")
private String eid;
@JsonProperty("MOH-ID")
private String mohId;
@JsonProperty("name")
private Name name;
@JsonProperty("email")
private String email;
@JsonProperty("mobile")
private String mobile;
@JsonProperty("dob")
private String dob;
@JsonProperty("address")
private List<Address> address = null;
@JsonProperty("insurance")
private Insurance insurance;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("id")
public String getId() {
return id;
}

@JsonProperty("id")
public void setId(String id) {
this.id = id;
}

@JsonProperty("EID")
public String getEid() {
return eid;
}

@JsonProperty("EID")
public void setEid(String eid) {
this.eid = eid;
}

@JsonProperty("MOH-ID")
public String getMohId() {
return mohId;
}

@JsonProperty("MOH-ID")
public void setMohId(String mohId) {
this.mohId = mohId;
}

@JsonProperty("name")
public Name getName() {
return name;
}

@JsonProperty("name")
public void setName(Name name) {
this.name = name;
}

@JsonProperty("email")
public String getEmail() {
return email;
}

@JsonProperty("email")
public void setEmail(String email) {
this.email = email;
}

@JsonProperty("mobile")
public String getMobile() {
return mobile;
}

@JsonProperty("mobile")
public void setMobile(String mobile) {
this.mobile = mobile;
}

@JsonProperty("dob")
public String getDob() {
return dob;
}

@JsonProperty("dob")
public void setDob(String dob) {
this.dob = dob;
}

@JsonProperty("address")
public List<Address> getAddress() {
return address;
}

@JsonProperty("address")
public void setAddress(List<Address> address) {
this.address = address;
}

@JsonProperty("insurance")
public Insurance getInsurance() {
return insurance;
}

@JsonProperty("insurance")
public void setInsurance(Insurance insurance) {
this.insurance = insurance;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}
-----------------------------------com.albatha.nexthealth.prescription.dto.PrescriptionDTO.java-----------------------------------

package com.albatha.nexthealth.prescription.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"prescriptionNumber",
"recordNumber",
"visitDate",
"diagnosis",
"drugs",
"pin",
"patient",
"doctor"
})
@Generated("jsonschema2pojo")
public class PrescriptionDTO {

@JsonProperty("prescriptionNumber")
private String prescriptionNumber;
@JsonProperty("recordNumber")
private String recordNumber;
@JsonProperty("visitDate")
private String visitDate;
@JsonProperty("diagnosis")
private String diagnosis;
@JsonProperty("drugs")
private List<Drug> drugs = null;
@JsonProperty("pin")
private String pin;
@JsonProperty("patient")
private Patient patient;
@JsonProperty("doctor")
private Doctor doctor;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("prescriptionNumber")
public String getPrescriptionNumber() {
return prescriptionNumber;
}

@JsonProperty("prescriptionNumber")
public void setPrescriptionNumber(String prescriptionNumber) {
this.prescriptionNumber = prescriptionNumber;
}

@JsonProperty("recordNumber")
public String getRecordNumber() {
return recordNumber;
}

@JsonProperty("recordNumber")
public void setRecordNumber(String recordNumber) {
this.recordNumber = recordNumber;
}

@JsonProperty("visitDate")
public String getVisitDate() {
return visitDate;
}

@JsonProperty("visitDate")
public void setVisitDate(String visitDate) {
this.visitDate = visitDate;
}

@JsonProperty("diagnosis")
public String getDiagnosis() {
return diagnosis;
}

@JsonProperty("diagnosis")
public void setDiagnosis(String diagnosis) {
this.diagnosis = diagnosis;
}

@JsonProperty("drugs")
public List<Drug> getDrugs() {
return drugs;
}

@JsonProperty("drugs")
public void setDrugs(List<Drug> drugs) {
this.drugs = drugs;
}

@JsonProperty("pin")
public String getPin() {
return pin;
}

@JsonProperty("pin")
public void setPin(String pin) {
this.pin = pin;
}

@JsonProperty("patient")
public Patient getPatient() {
return patient;
}

@JsonProperty("patient")
public void setPatient(Patient patient) {
this.patient = patient;
}

@JsonProperty("doctor")
public Doctor getDoctor() {
return doctor;
}

@JsonProperty("doctor")
public void setDoctor(Doctor doctor) {
this.doctor = doctor;
}

@JsonAnyGetter
public Map<String, Object> getAdditionalProperties() {
return this.additionalProperties;
}

@JsonAnySetter
public void setAdditionalProperty(String name, Object value) {
this.additionalProperties.put(name, value);
}

}