FROM maven:3.6.1-jdk-11 as backend-build
WORKDIR /fullstack/backend

COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src src
# skipping test as tests are allready done in different stage 
RUN mvn install -DskipTests

RUN mkdir -p target/dependency && ( cd target/dependency; jar -xf ../*.jar)

FROM openjdk:11-jdk

VOLUME /tmp
ARG DEPENDENCY=/fullstack/backend/target/dependency
COPY --from=backend-build ${DEPENDENCY}/BOOT-INF/lib app/lib
COPY --from=backend-build ${DEPENDENCY}/META-INF app/META-INF
COPY --from=backend-build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java" ,"-cp","app:app/lib/*" ,"com.albatha.nexthealth.prescription.PrescriptionApplication" ]
Proj: { $pt: { $m...", code: 2, codeName: "BadValue" }' on server localhost:57240. The full response is {"ok": 0.0, "errmsg": "geoNear command failed: { ok: 0.0, errmsg: \"error processing query: ns=embeddedDB.pharmacies limit=100Tree: GEONEAR  field=location maxdist=1.79769e+308 isNearSphere=1\nSort: {}\nProj: { $pt: { $m...\", code: 2, codeName: \"BadValue\" }", "code": 16604, "codeName": "Location16604"}; nested exception is com.mongodb.MongoCommandException: Command failed with error 16604 (Location16604): 'geoNear command failed: { ok: 0.0, errmsg: "error processing query: ns=embeddedDB.pharmacies limit=100Tree: GEONEAR  field=location maxdist=1.79769e+308 isNearSphere=1






{ 
    "_id" : BinData(3, "p0bt25liKpqKbCNNkmrEjg=="), 
    "name" : "XYZ Pharmacy", 
    "deliveryRadiusMeters" : 1.0, 
    "deliverySLAMinutes" : 22.0, 
    "brand" : BinData(3, "tkxkhzv0m9N6ZKDD75yvgg=="), 
    "address" : {
        "addressLine1" : "NMC pharmacy ", 
        "addressLine2" : "Silicon height", 
        "street" : "Alain street", 
        "area" : "Silicon oasis", 
        "city" : "Dubai", 
        "state" : "Dubai", 
        "country" : "Country"
    }, 
    "location" : {
        "type" : "Point", 
        "coordinates" : [
            25.12029137769962, 
            55.37985774113958
        ]
    }, 
    "contactDetails" : {
        "mobileNumbers" : [
            "213123123", 
            "64546456"
        ], 
        "landLineNumbers" : [
            "4444444", 
            "5555555"
        ], 
        "faxNumbers" : [
            "5555555", 
            "777777777"
        ], 
        "emails" : [
            "xyz@gmail.com", 
            "edf@gmail.com"
        ], 
        "website" : "www.xyz.com"
    }, 
    "openingHours" : [
        {
            "day" : "MONDAY", 
            "from" : ISODate("2022-06-07T04:00:00.000+0000"), 
            "to" : ISODate("2022-06-07T17:00:00.000+0000")
        }
    ], 
    "deliveryEnabled" : true, 
    "distanceCalculated" : 0.0, 
    "_class" : "com.albatha.nexthealth.pharmacies.model.Pharmacy"
}
