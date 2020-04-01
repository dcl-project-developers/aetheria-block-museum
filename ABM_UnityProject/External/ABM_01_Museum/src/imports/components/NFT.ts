import utils from "../../../node_modules/decentraland-ecs-utils/index"

var nft_hud: NFT_HUD

class NFT_HUD {
  canvas: UICanvas
  container: UIContainerRect
  titleShape: UIText
  textShape: UIText
  currentNFT: NFTdata
  constructor(){
    this.canvas = new UICanvas()
    this.container = new UIContainerRect(this.canvas)
    this.container.visible = false
    this.container.vAlign = 'top'
    this.container.hAlign = 'right'
    this.container.width = '20%'
    this.container.height = '50%'
    this.container.positionX = -10
    this.container.color = Color4.White()
    this.container.adaptHeight = false
    this.container.adaptWidth = false

    let titleContainer = new UIContainerRect(this.container)
    titleContainer.positionY = "-5%"
    titleContainer.vAlign = 'top'
    titleContainer.hAlign = 'center'
    titleContainer.width = "70%"
    titleContainer.height = "10%"
    titleContainer.color = Color4.Black()
    titleContainer.adaptHeight = false
    titleContainer.adaptWidth = false

    this.titleShape = new UIText(titleContainer)
    this.titleShape.hTextAlign = 'center'
    this.titleShape.vTextAlign = 'center'
    this.titleShape.height = "99%"
    this.titleShape.width = "100%"
    this.titleShape.color = Color4.White()
    this.titleShape.value = "Titleaaa"
    this.titleShape.fontSize = 25

    let textContainer = new UIContainerRect(this.container)
    textContainer.positionY = "-7%"
    textContainer.vAlign = 'center'
    textContainer.hAlign = 'center'
    textContainer.width = "90%"
    textContainer.height = "80%"
    textContainer.color = Color4.Gray()
    textContainer.adaptHeight = false
    textContainer.adaptWidth = false

    this.textShape = new UIText(textContainer)
    this.textShape.hTextAlign = 'center'
    this.textShape.vTextAlign = 'top'
    this.textShape.height = "90%"
    this.textShape.width = "90%"
    this.textShape.color = Color4.Black()
    this.textShape.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    this.textShape.fontSize = 10
    this.textShape.textWrapping = true

  }
  show(bShow: boolean){
    this.container.visible = bShow
  }
  setNFTdata(newNFT: NFTdata){
    this.currentNFT = newNFT
    this.textShape.value = newNFT.title
    this.textShape.value = newNFT.description
  }
}

function getNFTHUD(): NFT_HUD{
  if (!nft_hud) {
    nft_hud = new NFT_HUD()
  }
  return nft_hud
}

@Component('NFTdata')
export class NFTdata{
  entity: IEntity
  smartContract: string
  tokenId: string
  title: string
  description: string
  bDebug: boolean
  constructor(entity: IEntity, smartContract, tokenId, title?: string, description?: string){
    this.entity = entity
    this.smartContract = smartContract
    this.tokenId = tokenId
    const shapeComponent = new NFTShape('ethereum://'+smartContract+'/'+tokenId,Color3.Blue())
    entity.addComponent(shapeComponent)
    this.title = title
    this.description = description
    this.bDebug = true
    this.createTrigger()
    getNFTHUD()
  }
  createTrigger(){
    let triggerBox = new utils.TriggerBoxShape(new Vector3(10,3,10), new Vector3(0,0,0))
    //create trigger for entity
    let trigger = new utils.TriggerComponent(
       triggerBox, //shape
       0, //layer
       0, //triggeredByLayer
       null, //onTriggerEnter
       null, //onTriggerExit
       null,  //onCameraEnter
       null //onCameraExits
    )

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform({ position: this.entity.getComponent(Transform).position}))
    triggerEntity.addComponent(trigger)
    engine.addEntity(triggerEntity)
    let self = this
    this.entity.addComponent(new OnPointerDown(
        function() {
          var hud = getNFTHUD()
          if (hud.currentNFT!=self) {
            hud.setNFTdata(self)
            hud.show(true)
          }
          else hud.show(!hud.container.visible)
        },
        {
          button: ActionButton.POINTER,
          hoverText: "More info",
          distance: 5
        }
    ))

    trigger.onCameraExit = function(){
      var hud = getNFTHUD()
      if (hud.currentNFT==self) {
        hud.show(false)
      }
    }

    if (this.bDebug) {
      //Debug
      const debugEntity = new Entity()
      debugEntity.addComponent(new Transform({ position: this.entity.getComponent(Transform).position.add(triggerBox.position) , scale: triggerBox.size}))
      debugEntity.addComponent(new BoxShape())
      debugEntity.getComponent(BoxShape).withCollisions = false
      const myDebugMaterial = new Material()
      myDebugMaterial.albedoColor = new Color4(1, 0, 0, 0.2)
      debugEntity.addComponent(myDebugMaterial)
      engine.addEntity(debugEntity)
    }
    return trigger;
  }
}
