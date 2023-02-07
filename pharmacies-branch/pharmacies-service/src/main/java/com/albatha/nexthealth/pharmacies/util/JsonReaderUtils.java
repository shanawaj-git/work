package com.albatha.nexthealth.pharmacies.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public final class JsonReaderUtils {

    public static <T> T readFromJsonFile(
        String fileName,
        ObjectMapper objectMapper,
        TypeReference<T> typeReference
    ) throws IOException {
        InputStream resource = createJsonReader(fileName);
        return objectMapper.readValue(resource, typeReference);
    }

    static InputStream createJsonReader(String fileName) throws FileNotFoundException {
        InputStream resource = CsvReaderUtils.class.getResourceAsStream("/" + fileName);
        if (resource == null) {
            throw new FileNotFoundException(String.format("%s not found", fileName));
        }
        return resource;
    }
}
