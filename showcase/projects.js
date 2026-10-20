"use strict";
const projects=[["responsive_portfolio_with_dynamic_pages_2025","app","Multi-page personal portfolio website."],["connectus","app","Early-stage unified social workflow concept."],["insta","app","Android application project."],["open-source-world","community","React and TypeScript open-source community landing page."],["Learning-Stories-Repository","community","Community learning stories and contributions."],["dsa-code","practice","Multi-language data structures and algorithms practice."],["Projects-and-Interview-Question-Hacktoberfest2025","practice","Programming and technical interview question collection."],["Hacktoberfest2025","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025-Open-source-","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025d","hacktoberfest","Hacktoberfest-related code and contribution collection."],["hacktoberfest2025df","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025f","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025v","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025-Portfolio","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025mm","hacktoberfest","Hacktoberfest-related code and contribution collection."],["Hacktoberfest2025gg","hacktoberfest","Hacktoberfest-related code and contribution collection."],["hacktoberfest2025-contributions","hacktoberfest","Hacktoberfest-related code and contribution collection."]];
const grid=document.querySelector("#projects");
const search=document.querySelector("#search");
const category=document.querySelector("#category");
const count=document.querySelector("#count");
const labels={app:"Apps & web",practice:"Programming practice",community:"Community & open source",hacktoberfest:"Hacktoberfest"};
function render(){
  const term=search.value.trim().toLocaleLowerCase();
  const selected=category.value;
  const matches=projects.filter(([name,kind,description])=>(selected==="all"||selected===kind)&&[name,description,labels[kind]].join(" ").toLocaleLowerCase().includes(term));
  grid.replaceChildren();
  for(const [name,kind,description] of matches){
    const article=document.createElement("article");article.className="card";
    const tag=document.createElement("span");tag.className="tag";tag.textContent=labels[kind];
    const heading=document.createElement("h2");heading.textContent=name;
    const summary=document.createElement("p");summary.textContent=description;
    const link=document.createElement("a");link.className="link";link.href="https://github.com/iglho/"+encodeURIComponent(name);link.target="_blank";link.rel="noopener noreferrer";link.textContent="View repository ↗";link.setAttribute("aria-label","View "+name+" on GitHub");
    article.append(tag,heading,summary,link);grid.append(article);
  }
  count.textContent=matches.length+" of "+projects.length+" repositories";
}
search.addEventListener("input",render);category.addEventListener("change",render);render();
