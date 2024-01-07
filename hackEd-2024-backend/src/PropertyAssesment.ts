import { supabaseClient } from "./supabase";

export function populatePropertyAssesment() {
    const headers = new Headers();
    headers.set('$limit', 5000);


    const options: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            ["$limit"]: 5000
        })
    }

    const req = new Request('https://data.edmonton.ca/resource/q7d6-ambg.json', options);
    return fetch(req)
        .then(res => res.json())
        .then(data => data.length)
        .then(console.log);
}