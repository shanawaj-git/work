package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultContactDetails;
import com.albatha.nexthealth.pharmacies.model.Contact;

public class ContactDetailsBuilder {
    String[] mobileNumbers = DefaultContactDetails.MOBILE_NUMBER;
    String[] landLineNumbers = DefaultContactDetails.LANDLINE_NUMBER;
    String[] faxNumbers = DefaultContactDetails.FAX_NUMBER;
    String[] emails = DefaultContactDetails.EMAILS;
    String website = DefaultContactDetails.WEBSITES;

    public Contact build() {
        return new Contact(mobileNumbers, landLineNumbers, faxNumbers, emails, website);
    }
}
