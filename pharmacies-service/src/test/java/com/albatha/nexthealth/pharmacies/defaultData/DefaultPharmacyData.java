package com.albatha.nexthealth.pharmacies.defaultData;

import com.albatha.nexthealth.pharmacies.model.Day;
import com.albatha.nexthealth.pharmacies.model.OpeningHour;
import org.springframework.data.geo.Point;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public class DefaultPharmacyData {
    public static final UUID id = UUID.randomUUID();
    public static final String NAME = "MPC Pharmacy";
    public static final double DELIVERY_RADIUS_METERS = 300;
    public static final double DELIVERY_SLA_MINUTES = 22;
    public static final Point LOCATION = new Point(25.12460642644624, 55.37765046677036);
    public static final List<OpeningHour> OPENING_HOURS =
            List.of(new OpeningHour(Day.MONDAY, LocalTime.of(8, 0, 0),
                    LocalTime.of(21, 0, 0)));
    public static final Boolean DELIVERY_ENABLED = true;


}
