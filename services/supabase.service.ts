import { supabase } from "../utils/supabaseClient";

export async function fetchAlbums() {
  const { data, error } = await supabase
    .from("albums")
    .select(`*, artists (name)`)
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchArtists() {
  const { data, error } = await supabase.from("artists").select("name, id, current");
  
  if (error) {
    throw error;
  }

  return data;
}