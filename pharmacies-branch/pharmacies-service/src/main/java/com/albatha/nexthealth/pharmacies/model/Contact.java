package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    private String [] mobileNumbers;
    private String [] landLineNumbers;
    private String [] faxNumbers;
    private String [] emails;
    private String website;
}
