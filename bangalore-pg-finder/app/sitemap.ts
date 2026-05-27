export default function sitemap() {
  return ["/","/listings","/favorites","/compare","/about","/contact","/pg-in-koramangala","/boys-pg-in-whitefield","/girls-pg-near-electronic-city"].map((url)=>({url:`https://bangalorepgfinder.vercel.app${url}`,lastModified:new Date()}));
}
