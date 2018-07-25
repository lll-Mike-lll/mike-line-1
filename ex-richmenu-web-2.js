// Step 1: Create rich menu, and retrieve richMenuId
client.createRichMenu({
    size: { width: 2500, height: 1686 }, // Define size of rich menu
    selected: true, // Always display
    name: 'CryptoCurrency Page 2', // rich menu name
    chatBarText: 'CryptoCurrency', // show to user
    areas: [ // Area and action of each boundary
      {
        bounds: {
          x: 0,
          y: 0,
          width: 833,
          height: 843
        },
        action: {
          type: 'message',
          text: 'OMG'
        }
      }
       // And other boundary
    ]
  })
  
  // Step 2: Upload image to Step 1's rich menu id
  client.setRichMenuImage(richMenuId, fs.createReadStream('./rich-menu/menu-page-2.jpg'))