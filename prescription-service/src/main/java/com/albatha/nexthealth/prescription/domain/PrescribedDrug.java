package com.albatha.nexthealth.prescription.domain;


import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@EqualsAndHashCode(exclude = {"prescription", "drug"})
public class PrescribedDrug {
    @Id
    @SequenceGenerator(name = "prescribeddrug_sequence", sequenceName = "prescribeddrug_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prescribeddrug_sequence")
    private Long prescribeddrugId;

    private String frequency;
    private String unit;
    private String period;
    private String route;
    private String quantity;
    private String doctorNotes;
    private String timeUnit;

    @ToStringExclude
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "prescriptionId")
    private Prescription prescription;

    @ToStringExclude
    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "drugId")
    private Drug drug;

    @CreationTimestamp()
    private Timestamp createdDate;

    @Override
    public String toString() {
        return "PrescribedDrug{" +
                "prescribeddrugId=" + prescribeddrugId +
                '}';
    }
}
