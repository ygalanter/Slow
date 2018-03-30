function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Slow settings</Text>}>
      
       
              <Select
                label={`Digital Widget`}
                settingsKey="digital"
                options={[
                  {name:"Digital Time", value:"time"},
                  {name:"Battery charge", value:"battery"},
                  {name:"Time Active", value:"activeMinutes"},
                  {name:"Calories Burned", value:"calories"},
                  {name:"Distance Walked", value:"distance"},
                  {name:"Floors Climbed", value:"elevationGain"},
                  {name:"Step Count", value:"steps"}
                ]}
       />  
        
        
        
        
      </Section>
      
       <Section title={<Text bold align="center">Donate!</Text>}>
      
      <Text italic>If you like this clockface and would like to see it further developed as well as other wonderful Ionic apps and faces created, please know - I run on coffee. It's an essential fuel for inspiration and creativity. So feel free to donate so I won't run out of fuel :) Thanks!
         </Text>
      
      <Link source="https://paypal.me/yuriygalanter">YURIY'S COFFEE FUND</Link> 
         
         </Section>   

     
    </Page>
  );
}

registerSettingsPage(mySettings);