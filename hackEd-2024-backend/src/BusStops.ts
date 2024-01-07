import { supabaseClient } from "./supabase";

export function populateBusStops() {
    return fetch('https://data.edmonton.ca/resource/9j6k-uzig.json')
        .then(res => res.json())
        .then(stops => stops.map((stop: any) => ({...stop, location: {...stop.location, human_address: JSON.parse(stop.location.human_address)}})))
        .then(stops => {
            console.log(stops.length);
        });
}