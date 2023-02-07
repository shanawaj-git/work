package com.albatha.nexthealth.pharmacies;

import com.albatha.nexthealth.pharmacies.dto.DubaiDrugDTO;
import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.model.*;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.List;
import java.util.Arrays;
import java.util.Optional;
import java.util.ArrayList;

import static com.albatha.nexthealth.pharmacies.util.StringUtils.containsWord;

public class Mapper {

    public static Drug map(DubaiDrugDTO dubaiDrugDTO) {
        return new Drug(
            dubaiDrugDTO.getTradeName(),
            dubaiDrugDTO.getTradeName(),
            Integer.parseInt(dubaiDrugDTO.getGranularUnit()),
            dubaiDrugDTO.getDosageForm(),
            dubaiDrugDTO.getIngredientStrength(),
            dubaiDrugDTO.getGranularUnit(),
            dubaiDrugDTO.getIngredientStrength(),
            new Pricing(Double.parseDouble(dubaiDrugDTO.getPackagePrice())),
            createCodes(dubaiDrugDTO),
            mapToDrugStatus(dubaiDrugDTO.getStatus()),
            new Manufacturer(dubaiDrugDTO.getManufacturer(), "")
        );
    }

    private static DrugStatus mapToDrugStatus(String status) {
        Optional<DrugStatus> drugStatus = Arrays.stream(DrugStatus.values())
            .filter(it -> containsWord(status, it.label))
            .findFirst();

        return drugStatus.orElse(DrugStatus.EnteredInError);
    }

    private static List<Code> createCodes(DubaiDrugDTO drugDto) {
        List<Code> codes = new ArrayList<>();
        addDccCode(codes, drugDto);
        addScientificCode(codes, drugDto);
        return codes;
    }

    private static void addDccCode(List<Code> codes, DubaiDrugDTO drugDto) {
        if (drugDto.getDdcCode() != null)
            codes.add(new Code(DrugCodingSystem.DDC, drugDto.getDdcCode()));
    }

    private static void addScientificCode(List<Code> codes, DubaiDrugDTO drugDto) {
        if (drugDto.getScientificCode() != null)
            codes.add(new Code(DrugCodingSystem.SCIENTIFIC, drugDto.getScientificCode()));
    }

    public static Pharmacy map(PharmacyDTO pharmacyDTO) {
        return new Pharmacy(
            pharmacyDTO.getName(),
            pharmacyDTO.getDeliveryRadiusMeters(),
            pharmacyDTO.getDeliverySLAMinutes(),
            pharmacyDTO.getBrand(),
            pharmacyDTO.getAddress(),
            new Point(pharmacyDTO.getLocation().getX(), pharmacyDTO.getLocation().getY()),
            pharmacyDTO.getContactDetails(),
            pharmacyDTO.getOpeningHours(),
            pharmacyDTO.getDeliveryEnabled()
        );
    }

    public static PharmacyDTO map(Pharmacy pharmacy) {
        return new PharmacyDTO(
                pharmacy.getName(),
                pharmacy.getDeliveryRadiusMeters(),
                pharmacy.getDeliverySLAMinutes(),
                pharmacy.getBrand(),
                pharmacy.getAddress(),
                new GeoJsonPoint(pharmacy.getLocation().getX(), pharmacy.getLocation().getY()),
                pharmacy.getContactDetails(),
                pharmacy.getOpeningHours(),
                pharmacy.getDeliveryEnabled()
        );
    }
}
