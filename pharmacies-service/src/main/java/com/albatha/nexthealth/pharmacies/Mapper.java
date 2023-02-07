package com.albatha.nexthealth.pharmacies;

import com.albatha.nexthealth.domain.prescriptions.dto.DosageDTO;
import com.albatha.nexthealth.pharmacies.dto.DubaiDrugDTO;
import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.model.*;
import com.albatha.nexthealth.pharmacies.transformer.PharmacyMapper;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Arrays;
import java.util.Optional;

import static java.lang.Integer.parseInt;

import java.util.ArrayList;

import static com.albatha.nexthealth.pharmacies.util.StringUtils.containsWord;
@Service
public class Mapper extends PharmacyMapper {

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
    
    public static Dosage map(DosageDTO dosageDTO) {
		Dosage dosage = new Dosage();
		dosage.setFrequency(parseInt(dosageDTO.getFrequency()));
		dosage.setPeriod(parseInt(dosageDTO.getPeriod()));
		dosage.setQuantity(parseInt(dosageDTO.getQuantity()));
		dosage.setUnit(dosageDTO.getUnit());
		dosage.setTimeUnit(TimeUnit.fromValue(dosageDTO.getTimeUnit()));
		return dosage;
	}
}
