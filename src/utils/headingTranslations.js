// Clean dictionary mapping ONLY section headings to Tamil
export const HEADING_TRANSLATIONS = {
  // Brand & Slogan
  "FoodBridge": "ஃபுட்பிரிட்ஜ்",
  "Save Food. Share Hope.": "உணவை மிச்சப்படுத்துங்கள். நம்பிக்கையைப் பகிருங்கள்.",
  
  // Login Page Headings
  "Welcome to FoodBridge": "ஃபுட்பிரிட்ஜிற்கு நல்வரவு",
  "Connect surplus food from donors to receivers & eco-farms across the city": "உணவு வழங்குநர்கள், பெறுநர்கள் மற்றும் சுற்றுச்சூழல் பண்ணைகளை இணைக்கும் தளம்",
  "I am a Food Donor": "நான் உணவு வழங்குநர்",
  "I am a Food Receiver": "நான் உணவு பெறுநர்",
  "I am an Eco-Farm Partner": "நான் சுற்றுச்சூழல் பண்ணை கூட்டாளர்",
  "Login to FoodBridge": "ஃபுட்பிரிட்ஜில் உள்நுழையவும்",
  "Donor Sign In": "வழங்குநர் உள்நுழைவு",
  "Receiver Sign In": "பெறுநர் உள்நுழைவு",
  "Eco-Farm Sign In": "சுற்றுச்சூழல் பண்ணை உள்நுழைவு",
  
  // Donor Page Headings
  "Donate Surplus Food": "கூடுதல் உணவை தானம் செய்யுங்கள்",
  "Donor Food Management System": "வழங்குநர் உணவு மேலாண்மை அமைப்பு",
  "Enter Surplus Food Details": "கூடுதல் உணவு விவரங்களை உள்ளிடவும்",
  "Nearby Verified NGOs": "அருகிலுள்ள சரிபார்க்கப்பட்ட தன்னார்வ தொண்டு நிறுவனங்கள்",
  "My Posted Food Donations": "நான் வழங்கிய உணவுப் பதிவுகள்",
  "AI Smart Food Analysis & Advisory": "AI நுண்ணறிவு உணவு பகுப்பாய்வு மற்றும் வழிகாட்டல்",
  
  // Receiver Page Headings
  "Food Receiver Portal": "உணவு பெறுநர் தளம்",
  "Available Food Surpluses": "கிடைக்கக்கூடிய கூடுதல் உணவுகள்",
  "My Accepted Food Requests": "நாங்கள் ஏற்றுக்கொண்ட உணவு கோரிக்கைகள்",
  "Live Food Alerts": "நேரலை உணவு விழிப்பூட்டல்கள்",

  // Eco-Farm Page Headings
  "Eco-Farm Portal": "சுற்றுச்சூழல் பண்ணை தளம்",
  "Farm Produce & Waste Management": "பண்ணை உற்பத்தி மற்றும் கழிவு மேலாண்மை",
  "Eco-Farm Dashboard": "சுற்றுச்சூழல் பண்ணை கட்டுப்பாட்டு மையம்",
  "My Farm Produce Listings": "எனது பண்ணை உற்பத்திப் பட்டியல்",
  "Eco-Resources": "சுற்றுச்சூழல் வளங்கள்",
  "Post New Produce": "புதிய பண்ணை விளைபொருளைப் பதிவு செய்",
  "Farm Profile": "பண்ணை விவரக்குறிப்பு",
  "AI Eco-Resource Transformation Advisory": "AI சுற்றுச்சூழல் வள உருமாற்ற வழிகாட்டல்",

  // Map Page Headings
  "Nearby NGOs on Google Maps": "கூகுள் மேப்பில் அருகிலுள்ள தன்னார்வ தொண்டு நிறுவனங்கள்",
  "Verified Relief Centres in Bangalore": "பெங்களூரில் சரிபார்க்கப்பட்ட நிவாரண மையங்கள்"
};

export const translateHeading = (text, lang) => {
  if (lang !== "ta" || !text) return text;
  return HEADING_TRANSLATIONS[text.trim()] || text;
};

