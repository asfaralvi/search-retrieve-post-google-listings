'use strict';

import fetch from 'node-fetch';
import fs from 'fs';
import puppeteer from 'puppeteer';
import readline from 'readline';

var totalcount = 0;

(async function main() {
  try {
    var i = 1;

    var browser = await puppeteer.launch({
      headless: false,
      defaultViewport:null
    });
    var [page] = await browser.pages();
    const fileStream = fs.createReadStream('city.txt');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      totalcount++;
      try {
        // Each line in input.txt will be successively available here as `line`.
        console.log('Line from file: ' + line);
        if (totalcount % 25 == 0) {
          function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
          }
          await browser.close();
          browser = await puppeteer.launch({
            headless: false
          });
          [page] = await browser.pages();
          await sleep(1000);
        }
        await page.goto('https://www.google.de/search?q=domina+' + line);

        if (i == 1) {
          i++;
          //wait for google map list loading because we need to click on the view more url
          await sleep(5000);

          function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });

          }
        }
		
		//accept cookie policy 1-2-3-4-5 all
        if(await page.$$('#VnjCcb') != ""){
        const acceptpolicy = await page.$$('#VnjCcb');

            await acceptpolicy[0].click();
            //console.log("clicked");
          await sleep(4000);
          function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });

          }
        }

            if(await page.$$('button[jsname="yUNjVb"]') != ""){
              const acceptpolicy5 = await page.$$('button[jsname="yUNjVb"]');
      
                  await acceptpolicy5[0].click();
                  
               }
               await sleep(3000);
          function sleep(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });

          }
          if(await page.$$('button[jsname="FXYDXd"]') != ""){
                    const acceptpolicy1 = await page.$$('button[jsname="FXYDXd"]');
            
                        await acceptpolicy1[0].click();
                        
                     
        }
                      
           if(await page.$$('button[jsname="SHqtNc"]') != ""){
                            const acceptpolicy2 = await page.$$('button[jsname="SHqtNc"]');
                    
                                await acceptpolicy2[0].click();
                              
            
        
            }
           if(await page.$$('button[jsname="j6LnYe"]') != ""){
                                  const acceptpolicy3 = await page.$$('button[jsname="j6LnYe"]');
                          
                                      await acceptpolicy3[0].click();
                                      await sleep(10000);
            }


            if (await page.$$('a.fl') != "" && totalcount==1 ) {
           var langpage = await page.$eval('a.fl', (elm) => elm.href);
           await page.goto(langpage);
            await sleep(1000);


            //written for german language so if change language to "DE" if any other selected
            const delang = await page.$$('div[data-value="de"]');
                        
            await delang[0].click();
            const savelang = await page.$$('#form-buttons > div.goog-inline-block.jfk-button.jfk-button-action');
                        

            //alert dialog handling after language change
            await savelang[0].click();
           await page.on('dialog', async dialog => {
              dialog.accept();
            });
           await sleep(3000);
            await page.goto('https://www.google.de/search?q=domina+' + line);
                                  }
        if (await page.$$('a.tiS4rf') != "") {
          const href = await page.$eval("a.tiS4rf", (elm) => elm.href);
          await page.goto(href);
        } else {
          continue;
        }
        let countpage = (await page.$$('tr[jsname="TeSSVd"] > td')).length;
        if (countpage == 0) {
          countpage = 2;
        } else {
          countpage = countpage - 1;
        }

        countpage = countpage - 1;
        for (var j = 1; j <= countpage; j++)

        {
          if (j > 1) {
            var nextpage = await page.$eval("td.d6cvqb > a", (elm) => elm.href);
            await page.goto(nextpage);
            await sleep(1000);

            function sleep(ms) {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });
            }
          }
          let count = (await page.$$('div[jsname="GZq3Ke"]')).length;
          let idd = await page.$eval('div[jsname="GZq3Ke"]', (elm) => elm.id);
          for (var i = 0; i < count; i++) {

            var ab = idd + ' ';
            const elements = await page.$$('#' + idd + ' > div >div > a');

            await elements[0].click();
            await sleep(3000);

            function sleep(ms) {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });

            }

            var titlep = await page.$eval('h2.qrShPb > span', (elm) => elm.textContent);
            if (await page.$$('div.Z1hOCe > div > span.LrzXr') != "") {
              var address = await page.$eval('div.Z1hOCe > div > span.LrzXr', (elm) => elm.textContent);
            } else {
              address = "";
            }
            if (await page.$$('div.QqG1Sd >a.ab_button') != "") {
              var websie = await page.$eval('div.QqG1Sd >a.ab_button', (elm) => elm.href);
            } else {
              websie = "";
            }
            if (await page.$$('.JjSWRd >span>span>span') != "") {
              let timings = await page.evaluate((selector) => {
                let names = [];
                for (element of document.querySelector(selector).children) {
                  names.push([element.children[0].textContent, element.children[1].textContent]);
                }
                return names;
              }, 'table.WgFkxc>tbody');
              //   console.log(timings.map(e=> e[0])[0]);

                //sort opening hours to monday first from business map listing
              function arrayRotate(arr, reverse) {
                if (reverse) arr.unshift(arr.pop());
                else arr.push(arr.shift());
                return arr;
              }
              let tries = 19;
              while ((timings.map(e => e[0])[0] != "Montag") && tries>0) {
                // console.log(timings)
                timings = arrayRotate(timings);
                tries --;
              }
              var opening = '<table class="timings"><tbody>';
              for (let u = 0; u < timings.length; u++) {

                opening = opening + "<tr><td>" + timings.map(e => e[0])[u] + ": " + timings.map(e => e[1])[u] + "</td></tr>";
              }
              opening = opening + "</tbody></table>";
            } else {
              opening = "";
            }
            if (await page.$$('span.LrzXr > a > span') != "") {
              var phone = await page.$eval('span.LrzXr > a > span', (elm) => elm.textContent);
            } else {
              phone = "";
            }

            const searchrequest = await fetch('https://example.com/wp-json/wp/v2/posts/?search=' + titlep, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + btoa("paste username here : paste auth code here" )
              }
            });
            const check = await searchrequest.json();
            if (check == "") {
              console.log('Uploaded:' + titlep);
              const checkcategory = await fetch('https://example.com/wp-json/wp/v2/categories/?search=' + line, {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Basic " + btoa("paste username here : paste auth code here")
                }
              });
              let checkcat = await checkcategory.json();
              checkcat.forEach(element => {
                if (element.name === line) {
                  checkcat = element
                }
              });
              if (websie.includes('www.google')) {
                websie = ''
              }
              const abc = {
                title: titlep,
                status: "publish",
                format: 'standard',
                categories: checkcat.id,
                fields: {
                  name: titlep,
                  adresse: address,
                  telefon: phone,
                  offnungszeiten: opening,
                  webseite: websie
                }
              };
              const sendrequest = await fetch('https://example.com/wp-json/wp/v2/posts/', {
                method: 'post',
                body: JSON.stringify(abc),
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Basic " + btoa("paste username here : paste auth code here")
                }
              });
              const data = await sendrequest.json();
            } else {
              console.log('Already added-skipped:' + titlep);
            }

            const firstn = await page.$('#' + idd + '');
            //next sibling listing
            const nextsib = await page.evaluateHandle(el => el.nextElementSibling, firstn);
            if (i < (count - 1)) {
              idd = await (await nextsib.getProperty('id')).jsonValue();
            }
          };

        };

      } catch  (err) {

        console.error(err);
      }


    }
  // await browser.close();
    console.log('complete');
  } catch (err) {
    console.error(err);
  }
})();