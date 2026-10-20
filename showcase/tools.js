"use strict";
const byId = (id) => document.getElementById(id);
function ipv4ToInt(value) {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some(p => !/^\d{1,3}$/.test(p) || Number(p) > 255)) return null;
  return parts.reduce((acc, part) => ((acc * 256) + Number(part)) >>> 0, 0) >>> 0;
}
function intToIpv4(value) { return [24,16,8,0].map(shift => (value >>> shift) & 255).join("."); }
byId("subnet-form").addEventListener("submit", event => {
  event.preventDefault();
  const ip = ipv4ToInt(byId("ip").value);
  const prefix = Number(byId("cidr").value);
  const output = byId("subnet-result");
  if (ip === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    output.textContent = "Please enter a valid IPv4 address and a whole-number prefix from 0 to 32."; return;
  }
  const mask = prefix === 0 ? 0 : (0xffffffff << (32-prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = Math.pow(2, 32-prefix);
  const usable = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0,total-2);
  const rows = [
    ["Network address",intToIpv4(network)+"/"+prefix],
    ["Subnet mask",intToIpv4(mask)],
    ["First address",intToIpv4(network)],
    ["Last address",intToIpv4(broadcast)],
    ["Broadcast address",intToIpv4(broadcast)],
    ["Total addresses",total.toLocaleString()],
    ["Usable hosts (conventional)",prefix >= 31 ? "Point-to-point / special case; check your network convention" : usable.toLocaleString()]
  ];
  output.replaceChildren();
  const ul=document.createElement("ul");
  for(const [label,value] of rows){const li=document.createElement("li");li.textContent=label+": "+value;ul.append(li)}
  output.append(ul);
});
byId("search-form").addEventListener("submit", event => {
  event.preventDefault();
  const output=byId("search-result");
  const raw=byId("numbers").value.split(",").map(v=>v.trim());
  const values=raw.map(Number);
  const target=Number(byId("target").value);
  if(!raw.length || raw.some(v=>v==="") || values.some(v=>!Number.isFinite(v)) || !Number.isFinite(target)){
    output.textContent="Please enter finite numbers separated by commas.";return;
  }
  if(values.some((v,i)=>i>0 && values[i-1]>v)){
    output.textContent="The list must be sorted in ascending order. Please sort it and try again.";return;
  }
  const steps=[];let left=0,right=values.length-1,found=-1;
  while(left<=right){
    const mid=Math.floor((left+right)/2);
    steps.push({left,right,mid,value:values[mid]});
    if(values[mid]===target){found=mid;break}
    if(values[mid]<target)left=mid+1;else right=mid-1;
  }
  output.replaceChildren();
  const summary=document.createElement("p");
  summary.textContent=found>=0?"Found "+target+" at zero-based index "+found+".":"Target "+target+" was not found.";
  output.append(summary);
  steps.forEach((s,i)=>{const row=document.createElement("div");row.className="step";row.textContent="Step "+(i+1)+": left="+s.left+", right="+s.right+", mid="+s.mid+" → "+s.value+(s.value===target?" (match)":s.value<target?" (search right half)":" (search left half)");output.append(row)});
  const note=document.createElement("p");note.textContent="Comparisons: "+steps.length+" · Time complexity: O(log n)";output.append(note);
});
byId("password-form").addEventListener("submit", event => {
  event.preventDefault();
  const value=byId("password").value;
  const output=byId("password-result");
  const checks=[
    ["Length of at least 15 characters",value.length>=15],
    ["Includes lowercase letters",/[a-z]/.test(value)],
    ["Includes uppercase letters",/[A-Z]/.test(value)],
    ["Includes numbers",/[0-9]/.test(value)],
    ["Includes symbols",/[^A-Za-z0-9]/.test(value)],
    ["Avoids common repeated-character runs",!/(.)\1\1/.test(value)]
  ];
  output.replaceChildren();
  const title=document.createElement("p");
  title.textContent="Heuristic checklist: "+checks.filter(c=>c[1]).length+" / "+checks.length+" checks passed.";
  output.append(title);
  const ul=document.createElement("ul");
  checks.forEach(([label,passed])=>{const li=document.createElement("li");li.textContent=(passed?"✓ ":"○ ")+label;ul.append(li)});
  output.append(ul);
  const reminder=document.createElement("p");
  reminder.textContent="Use a unique passphrase, a password manager, and MFA. Length and variety alone cannot determine real-world strength.";
  output.append(reminder);
  byId("password").value="";
});
