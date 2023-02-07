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
public class Facility {
    @Id
    @SequenceGenerator(name = "facility_sequence", sequenceName = "facility_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "facility_sequence")
    private Long facilityId;

    String facId;
    String name;
    String address;

    @CreationTimestamp()
    private Timestamp createdDate;
}
