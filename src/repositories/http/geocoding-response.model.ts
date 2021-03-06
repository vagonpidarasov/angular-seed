export interface GeocodingResponse {
    Response:{
        View:[{
            _type:string;
            ViewId:number;
            Result:[{
                Relevance:number;
                Distance:number;
                Direction:number;
                MatchLevel:string;
                MatchQuality:{
                    Country:number;
                    State:number;
                    County:number;
                    City:number;
                    District:number;
                    PostalCode:number;
                };
                Location:{
                    LocationId:string;
                    LocationType:string;
                    DisplayPosition:{
                        Latitude:number;
                        Longitude:number;
                    };
                    MapView:{
                        TopLeft:{
                            Latitude:number;
                            Longitude:number;
                        };
                        BottomRight:{
                            Latitude:number;
                            Longitude:number;
                        };
                    };
                    Address:{
                        Label:string;
                        Country:string;
                        State:string;
                        County:string;
                        City:string;
                        District:string;
                        PostalCode:string;
                        AdditionalData:[{
                            value:string;
                            key:string;
                        }];
                    };
                    MapReference:{
                        ReferenceId:string;
                        MapId:string;
                        MapVersion:string;
                        MapReleaseDate:string;
                        SideOfStreet:string;
                        CountryId:string;
                        StateId:string;
                        CountyId:string;
                        CityId:string;
                    };
                };
            }];
        }];
    };
}
