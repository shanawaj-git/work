package com.albatha.nexthealth.pharmacies.util;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

public final class CsvReaderUtils {

    public static <T> List<T> readDrugsFromCsvFile(String fileName, Class<T> targetClass) throws IOException {
        CSVReader reader = createCsvReader(fileName);
        CsvToBean<T> csvToBean = new CsvToBean<>();
        csvToBean.setCsvReader(reader);
        setMappingStrategy(csvToBean, targetClass);
        return csvToBean.parse();
    }

    static CSVReader createCsvReader(String fileName) throws FileNotFoundException {
        InputStream resource = CsvReaderUtils.class.getResourceAsStream("/" + fileName);
        if (resource == null) {
            throw new FileNotFoundException(String.format("%s not found", fileName));
        }
        return new CSVReader(new InputStreamReader(resource));
    }

    static <T> void setMappingStrategy(CsvToBean<T> csvToBean, Class<T> targetClass) {
        HeaderColumnNameMappingStrategy<T> strategy = new HeaderColumnNameMappingStrategy<>();
        strategy.setType(targetClass);
        csvToBean.setMappingStrategy(strategy);
    }
}
