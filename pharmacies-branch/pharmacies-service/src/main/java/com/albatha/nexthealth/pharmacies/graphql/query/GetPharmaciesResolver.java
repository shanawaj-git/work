package com.albatha.nexthealth.pharmacies.graphql.query;

import com.albatha.nexthealth.pharmacies.Mapper;
import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.graphql.input.GetPharmaciesInput;
import com.albatha.nexthealth.pharmacies.graphql.input.Location;
import com.albatha.nexthealth.pharmacies.graphql.output.ErrorDTO;
import com.albatha.nexthealth.pharmacies.graphql.output.GraphqlResponse;
import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import com.albatha.nexthealth.pharmacies.model.PharmacyBrand;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.modelmapper.ModelMapper;

import java.util.UUID;

public class GetPharmaciesResolver implements GraphQLQueryResolver {
    // To be replaced by pharmacy service class
    private final Object pharmacyService;
    private final ModelMapper customModelMapper;


    public GetPharmaciesResolver(ModelMapper modelMapper) {
        // to be replaced by pharmacy service
        this.pharmacyService = null;
        this.customModelMapper = modelMapper;
    }

    public GraphqlResponse<PharmacyDTO> getPharmacies(GetPharmaciesInput getPharmaciesInput) {
        try {
            // extract pharmacy location to be passed to search query
            Location location = getPharmaciesInput.getLocation();

            // mocking search result
            Pharmacy pharmacyFromService = new Pharmacy();
            pharmacyFromService.setName("");
            pharmacyFromService.setDeliveryRadiusMeters(20);
            pharmacyFromService.setDeliverySLAMinutes(30);
            pharmacyFromService.setBrand(new PharmacyBrand(UUID.randomUUID(),"MPC"));

            // map pharmacy to PharmacyDTO
            return createSuccessfulAddressResponse(pharmacyFromService);

            //this.pharmacyService.getPharmacies()
        } catch (Exception e) {
            return createFailureAddressResponse();

        }
    }

    private GraphqlResponse<PharmacyDTO> createSuccessfulAddressResponse(Pharmacy pharmacy) {
        PharmacyDTO mappedPharmacy = Mapper.map(pharmacy);

        return new GraphqlResponse<>(true, mappedPharmacy, null);
    }


    private GraphqlResponse<PharmacyDTO> createFailureAddressResponse() {
        return new GraphqlResponse<>(false, null, new ErrorDTO("404", "not found"));
    }

}
