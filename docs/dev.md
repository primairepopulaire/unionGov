# Developer guide

### Table of Contents  
[Global architecture](#global-archi)  
[Development](#development)  
[Test](#test)  
[Production](#production) 

## <a name="global-archi"></a>Global architecture    
![global architecture](/docs/images/archi_globale.png)
  
  

## Model of object-oriented database   
![UML](/docs/images/uml.png)

To update those image files :
  * access [drawio](https://app.diagrams.net/)
  * import `docs/images/uml.drawio`
  * make the necessary updates
  * export as a png image
  * replace the image in the repo at `docs/images`

Short description of the tables:
  * users : people who signed the petition
  * position : government department
  * candidate : people running for the presidency
  * config : association of a candidate with a specific position
  * config\_ref : Reference of a complete set of configs that define a government 

## <a name="development"></a>Development
## <a name="test"></a>Testing
## <a name="production"></a>Production

