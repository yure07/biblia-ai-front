import type { BibleStudyPlan, StudyDay } from "../@types/detailsStudyPlanCustom";

export const parseBibleStudyPlan = (input: string): BibleStudyPlan => {
  const lines = input.split('\n').map(line => line.trim()).filter(line => line);

  const titleMatch = lines.shift()?.match(/\*\*(.*?)\*\*/);
  const title = titleMatch ? titleMatch[1].replace('Plano de Estudo Bíblico: ', '') : '';

  const days: Record<string, StudyDay> = {};
  let currentDay: string | null = null;
  let currentKey: keyof StudyDay | '' = '';

  for (const line of lines) {
      if (line.startsWith('**Dia')) {
          const dayMatch = line.match(/Dia (\d+) - (.+?)\*\*/);
          if (dayMatch) {
              currentDay = dayMatch[1];
              days[currentDay] = {
                  title: dayMatch[2],
                  verse: '',
                  explanation: '',
                  refletion: [],
                  gratitude: ''
              };
              currentKey = '';
          }
      } else if (line.startsWith('Versículo do dia:')) {
          currentKey = 'verse';
          if (currentDay) {
              days[currentDay].verse = line.replace('Versículo do dia: ', '').replace(/"/g, '');
          }
      } else if (line.startsWith('Explicação:')) {
          currentKey = 'explanation';
          if (currentDay) {
              days[currentDay].explanation = line.replace('Explicação: ', '');
          }
      } else if (line.startsWith('Reflexão:')) {
          currentKey = 'refletion';
      } else if (line.startsWith('Gratidão do dia:')) {
          currentKey = 'gratitude';
          if (currentDay) {
              days[currentDay].gratitude = line.replace('Gratidão do dia: ', '');
          }
      } else {
          if (currentDay) {
              if (currentKey === 'refletion') {
                  days[currentDay].refletion.push(line);
              } else if (currentKey && days[currentDay]) {
                  days[currentDay][currentKey] += ` ${line}`;
              }
          }
      }
  }

  return { title, days };
}

// Exemplo de uso:
const inputText = `**Plano de Estudo Bíblico: Aumentando a Sabedoria em 8 dias**

**Dia 1 - Provérbios 1:7**
Versículo do dia: "passagem do livro"
Explicação: explicação da passagem
Reflexão: 
O que esse versículo significa para você?
Como você pode aplicá-lo em sua vida?
Gratidão do dia: Um pequeno texto de gratidão.

**Dia 2 - João 3:16**
Versículo do dia: "passagem do livro"
Explicação: explicação da passagem
Reflexão:
Por que esse versículo é importante?
O que ele revela sobre o amor de Deus?
Gratidão do dia: Outro pequeno texto de gratidão.`;

//console.log(parseBibleStudyPlan(inputText));
