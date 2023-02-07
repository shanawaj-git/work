package com.albatha.nexthealth.prescription.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Drug {
    @Id
    @SequenceGenerator(
            name = "drug_sequence",
            sequenceName = "drug_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "drug_sequence")
    private Long drugId;

    @OneToMany(mappedBy = "drug")
    Set<PrescribedDrug> prescribedDrugs = new HashSet<>();
    String name;
    String code;

    @CreationTimestamp()
    private Timestamp createdDate;
}
