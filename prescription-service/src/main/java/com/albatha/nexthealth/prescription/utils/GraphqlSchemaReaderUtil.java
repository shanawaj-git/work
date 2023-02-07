package com.albatha.nexthealth.prescription.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
public final class GraphqlSchemaReaderUtil {
    public static String getSchemaFromFileName(final String filename) throws IOException {
        return new String(
            GraphqlSchemaReaderUtil.class.getClassLoader()
                .getResourceAsStream("schemas/" + filename + ".graphql")
                .readAllBytes()
        );
    }
}
