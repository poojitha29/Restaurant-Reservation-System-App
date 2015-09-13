package rrs.egen.app;

import io.swagger.jaxrs.config.BeanConfig;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/api")
public class RESTAppConfig  extends ResourceConfig{
	
	public RESTAppConfig(){
		packages("rrs.egen.rest"); // all CRUD operations will be in REST
		
		register(io.swagger.jaxrs.listing.ApiListingResource.class);
		register(io.swagger.jaxrs.listing.SwaggerSerializers.class);
        
		BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setBasePath("/RestaurantReservationSystemAPI/api");
        beanConfig.setResourcePackage("rrs.egen");
        beanConfig.setTitle("REST API Documentation");
        beanConfig.setDescription("REST API for the Restaurant Reservation System Application");
        beanConfig.setScan(true);
	}

}
