import React from 'react';
import Button from 'react-bootstrap/Button';
import {RouteComponentProps} from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';

interface IMyComponentProps {
  experimentalGroup: string
}

interface IMyComponentState {
  workerId: string
}

export default class Lesson extends React.Component<IMyComponentProps & RouteComponentProps, IMyComponentState> {

  constructor(props: any) {
    super(props);

    this.state ={
      workerId: (this.props.match.params as any).workerId
    }
  }

  /**
   * Returns specific button based on experimental group
   * @function
   */
  getButton() {
    if (this.props.experimentalGroup === 'control') {
      return <Button variant="dark" type="submit"> <Link to={`/quiz/${this.state.workerId}`}>Start Quiz</Link> </Button>
    } else {
      return <Button variant="dark" type="submit"> <Link to={`/chat/${this.state.workerId}`}>Start Chat</Link> </Button>
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <p className="page-title">Lesson on Covid-19</p>
        <div className="page-content">

<h2>Structure of the document</h2>
<p>This overview is organized by first presenting a background on coronaviruses and then briefly describes the emergence, transmission, symptoms, prevention and treatment of COVID-19. The rest of the document reviews COVID-19 IPC priorities, in non-US healthcare settings.</p>
<h2>Coronavirus Background:</h2>
<p>Coronaviruses are a large family of viruses that can cause illness in animals or humans. In humans there are several known coronaviruses that cause respiratory infections. These coronaviruses range from the common cold to more severe diseases such as severe acute respiratory syndrome (SARS), Middle East respiratory syndrome (MERS), and COVID-19.</p>
<h2>Coronavirus Disease 2019:</h2>
<h3>Emergence</h3>
<p>COVID-19 was identified in Wuhan, China in December 2019. COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread from person-to-person. Early in the outbreak, many patients were reported to have a link to a large seafood and live animal market, however, later cases with no link to the market confirmed person-to-person transmission of the disease. Additionally, travel-related exportation of cases has occurred.</p>
<h3>Transmission</h3>
<p>COVID-19 is primarily transmitted from person-to-person through respiratory droplets. These droplets are released when someone with COVID-19 sneezes, coughs, or talks. Infectious droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs. A physical distance of at least 1 meter (3 ft) between persons is suggested by the World Health Organization (WHO) to avoid infection, although some WHO member states have recommended maintaining greater distances whenever possible. &nbsp;Respiratory droplets can land on hands, objects or surfaces around the person when they cough or talk, and people can then become infected with COVID-19 from touching hands, objects or surfaces with droplets and then touching their eyes, nose, or mouth. Recent data suggest that there can be transmission of COVID-19 through droplets of those with mild symptoms or those who do not feel ill. Current data do not support long range aerosol transmission of SARS-CoV-2, such as seen with measles or tuberculosis. Short-range inhalation of aerosols is a possibility for COVID-19, as with many respiratory pathogens. However, this cannot easily be distinguished from &ldquo;droplet&rdquo; transmission based on epidemiologic patterns. Short-range transmission is a possibility particularly in crowded medical wards and inadequately ventilated spaces. Certain procedures in health facilities can generate fine aerosols and should be avoided whenever possible.</p>
<h3>Symptoms</h3>
<p>A wide range of symptoms for COVID-19 have been reported. These include:</p>
<ul>
<li>Fever or chills</li>
<li>Cough</li>
<li>Shortness of breath or difficulty breathing</li>
<li>Fatigue</li>
<li>Headache</li>
<li>Nasal congestion or runny nose</li>
<li>Muscle or body aches</li>
<li>Sore throat</li>
<li>New loss of smell or taste</li>
<li>Nausea or vomiting</li>
<li>Diarrhea</li>
</ul>
<p>The estimated incubation period is between 2 and 14 days with a median of 5 days. It is important to note that some people become infected and do not develop any symptoms or feel unwell.</p>
<h3>Illness Severity</h3>
<p>Despite the important concerns about case fatality rates, most COVID-19 illnesses are &ndash; and we expect will continue to be &ndash; mild, and most patients will recover spontaneously with some supportive care, especially children and young adults. Data from several countries suggest that 14%-19% are hospitalized and 3%-5% will need intense care unit admission.</p>
<p>The first largest description of patients with COVID-19 came from China, where the outbreak of COVID-19 started, and is described in detail below. &nbsp;Among the 44,672 confirmed COVID-19 cases reported from December 31, 2019 through February 11, 2020, the clinical presentation was as follow:</p>
<p><strong>Mild </strong>(non-pneumonia and mild pneumonia cases) represented 80.9% of confirmed patients with COVID-19 in China.</p>
<p><strong>NOTE: </strong>These cases included a large spectrum of illnesses including but not limited to patients having fever, cough, chest pain, nausea, and body pain. <strong>Severe </strong>(dyspnea, respiratory frequency &ge; 30/min, blood O<sub>2</sub> sat &le;93%, PaO2/FiO2 ratio &lt;300, lung infiltrates &gt;50% within 24&ndash;48 hours) represented 13.8% of confirmed patients with COVID-19 in China.</p>
<p><strong>Critical </strong>(respiratory failure, septic shock, and/or multiple organ dysfunction or failure, death) represented 4.7% of confirmed patients with COVID-19 in China. 1,023 (49%) deaths were reported among the 2,087 critically ill patients.</p>
<h3>People at Higher Risk for Severe Illness</h3>
<p>It is important to note that COVID-19 is a new disease, therefore there is limited information regarding risk factors for severe disease. In some cases, people who get COVID-19 can become seriously ill and develop difficulty breathing. These severe complications can lead to death. The risk of severe disease increases steadily as people age. Additionally, those of all ages with underlying medical conditions (including but not limited to heart disease, diabetes, or lung disease) appear to be at higher risk in developing severe COVID-19 compared to those without these conditions. As more data become available, additional risk factors for severe COVID-19 may be identified.</p>
<h2>COVID-19 Prevention and Treatment</h2>
<h3>COVID-19: Everyday Preventive Actions</h3>
<p>There are a number of ways to prevent the spread of COVID-19 infection. These include:</p>
<ul>
<li>Avoid touching your eyes, nose and mouth</li>
<li>Avoid close contact with people who are sick
<ul>
<li>Remember that some people without symptoms can still spread the virus</li>
</ul>
</li>
<li>Stay at home when you are sick</li>
<li>Cover your cough or sneeze with a tissue, then dispose of it properly</li>
<li>Use a face covering when physical distancing is difficult or when going into closed spaces
<ul>
<li>Physical distancing should be at least 1 meter (3 ft)</li>
</ul>
</li>
<li>Clean and disinfect frequently touched objects and surfaces</li>
<li>Perform hand hygiene with soap and water or use alcohol-based hand rub
<ul>
<li>Hand Rub should contain at least 60% alcohol</li>
<li>Hand washing should be done for at least 40-60 seconds based on WHO&rsquo;s recommendations</li>
</ul>
</li>
</ul>
<h3>COVID-19: Treatment</h3>
<p>Currently, care for patients with COVID-19 is primarily supportive. Care is given to patients to help relieve symptoms and manage respiratory and other organ failure. There are currently no specific antiviral treatments licensed for COVID-19, however many treatments are under investigation. Remdesivir, which is also an investigational drug, received Food and Drug Administration (FDA) emergency use authorization for treatment of hospitalized patients. Finally, no vaccine is currently available.</p>
<h2>IPC for COVID-19</h2>
<h3>What is IPC?</h3>
<p>Infection prevention and control (IPC) is the practice of preventing or stopping the spread of infections during healthcare delivery in facilities like hospitals, outpatient clinics, dialysis centers, long-term care facilities, or traditional practitioners. IPC is a critical part of health system strengthening and must be a priority to protect patients and healthcare workers. <strong>In the context of COVID-19, the IPC goal is to support the maintenance of essential healthcare services by containing and preventing COVID-19 transmission within healthcare facilities</strong> <strong>to keep patients and healthcare workers healthy and safe.</strong></p>
<h3>COVID-19: IPC Priorities</h3>
<ol>
<li>Rapid identification of suspect cases
<ol>
<li>Screening/Triage at initial healthcare facility encounter and rapid implementation of source control</li>
<li>Limiting the entry of healthcare workers and/or visitors with suspected or confirmed COVID-19</li>
</ol>
</li>
<li>Immediate isolation and referral for testing
<ol>
<li>Group patients with suspected or confirmed COVID-19 separately</li>
<li>Test all suspected patients for COVID-19</li>
</ol>
</li>
<li>Safe clinical management
<ol>
<li>Immediate identification of inpatients and healthcare workers with suspected COVID-19</li>
</ol>
</li>
<li>Adherence to IPC practices
<ol>
<li>Appropriate use of Personal protective equipment (PPE)</li>
</ol>
</li>
</ol>
<p>Reference (Retrieved 10/5/2020): https://www.cdc.gov/coronavirus/2019-ncov/hcp/non-us-settings/overview/index.html</p>
<p><i><b>When you have completed reviewing the lesson, click button below.</b></i></p>
      </div>

        <div className="page-title">
          {this.getButton()}
        </div>

      </div>
    );
  }
}