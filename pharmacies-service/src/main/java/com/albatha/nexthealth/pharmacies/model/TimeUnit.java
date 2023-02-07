package com.albatha.nexthealth.pharmacies.model;

import java.util.stream.Stream;

public enum TimeUnit {
    DAY("day"),
    WEEK("week"),
    MONTH("month");
    public final String value;
    private TimeUnit(String value) {
        this.value = value;
    }
    
	public static TimeUnit fromValue(String value) {
		return Stream.of(TimeUnit.values())
				.filter(tu -> tu.value.equals(value))
				.findFirst()
				.orElse(null);
	}
}
