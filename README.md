# apollo-nested-client-field

## Example to show incorrect @client nested fields resolution by @apollo/client@4

### Steps to reproduce
1. Clone this repo.
2. `npm i`
3. `npm test`

`nested-client-field.test.js` - This test should pass if nested `@client` fields work properly, **now it fails**.  
`root-client-field.test.js` - Almost the same test, but with root fields instead of nested. It works properly, but I've notices strange behavior of calling `read` funtion 3 times per single query.