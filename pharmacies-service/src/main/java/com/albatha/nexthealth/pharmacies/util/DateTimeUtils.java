package com.albatha.nexthealth.pharmacies.util;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

public class DateTimeUtils {
    private DateTimeUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String toISOString(Timestamp timestamp) {
        return Optional.ofNullable(timestamp).map(ts -> ts.toInstant().toString()).orElse(null);
    }

    public static String toISOString(Date date) {
        return Optional.ofNullable(date).map(d -> Instant.ofEpochMilli(d.getTime()).toString()).orElse(null);
    }

    public static OffsetDateTime toUTCOffsetDateTime(Timestamp timestamp) {
        return Optional.ofNullable(timestamp).map(ts -> timestamp.toInstant().atOffset(ZoneOffset.UTC)).orElse(null);
    }

    public static OffsetDateTime toUTCOffsetDateTime(Date date) {
        return Optional.ofNullable(date).map(d -> Instant.ofEpochMilli(d.getTime()).atOffset(ZoneOffset.UTC)).orElse(null);
    }

    public static Timestamp toTimeStamp(OffsetDateTime offsetDateTime) {
        return Optional.ofNullable(offsetDateTime).map(d -> Timestamp.valueOf(offsetDateTime.atZoneSameInstant(ZoneOffset.UTC).toLocalDateTime())).orElse(null);
    }
}
