package com.albatha.nexthealth.pharmacies.migration;

import com.albatha.nexthealth.pharmacies.Mapper;
import com.albatha.nexthealth.pharmacies.dto.DubaiDrugDTO;
import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.model.Drug;
import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import com.albatha.nexthealth.pharmacies.util.CsvReaderUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static com.albatha.nexthealth.pharmacies.util.JsonReaderUtils.readFromJsonFile;

public class DataInitialisation {

    final
    ObjectMapper customObjectMapper;

    public DataInitialisation(ObjectMapper customObjectMapper) {
        this.customObjectMapper = customObjectMapper;
    }

    public static List<Drug> readDubaiDrugsDataCsv(String filename) throws IOException {
        List<DubaiDrugDTO> dubaiDrugDtos = CsvReaderUtils.readDrugsFromCsvFile(filename, DubaiDrugDTO.class);
        return dubaiDrugDtos.stream().map(Mapper::map).collect(Collectors.toList());
    }

    public List<Pharmacy> readPharmaciesFromJson(String fileName) throws IOException {
        TypeReference<List<PharmacyDTO>> typeReference = new TypeReference<>() {};
        List<PharmacyDTO> pharmacyDTOS = readFromJsonFile(fileName, customObjectMapper, typeReference);
        return pharmacyDTOS.stream().map(Mapper::map).collect(Collectors.toList());
    }
}
