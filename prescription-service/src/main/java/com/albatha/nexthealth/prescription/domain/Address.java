package com.albatha.nexthealth.prescription.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Address {

    @Id
    @SequenceGenerator(name = "address_sequence", sequenceName = "address_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_sequence")
    private Long addressId;
    private String addressLine1;
    private String addressLine2;
    private String area;
    private String city;
    private String state;
    private String postalCode;
    private String type;
    private String country;

    @CreationTimestamp
    private Timestamp createdDate;
}
