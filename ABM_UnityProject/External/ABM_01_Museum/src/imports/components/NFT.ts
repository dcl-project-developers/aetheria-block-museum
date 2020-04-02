import utils from "../../../node_modules/decentraland-ecs-utils/index"

var nft_hud: NFT_HUD

class NFT_HUD {
  canvas: UICanvas
  container: UIContainerRect
  image: UIImage
  titleShape: UIText
  autorShape: UIText
  textShape: UIText
  currentNFT: NFTdata
  constructor(){
    this.canvas = new UICanvas()
    this.image = new UIImage(this.canvas, new Texture("assets/UI_ArtDescription_01.png"))
    this.image.visible = false
    this.image.sourceWidth = 665
    this.image.sourceHeight = 1000
    this.image.width = this.image.sourceWidth*0.6+'px'
    this.image.height = this.image.sourceHeight*0.6+'px'
    this.image.vAlign = 'top'
    this.image.hAlign = 'right'

    this.container = new UIContainerRect(this.canvas)
    this.container.visible = false
    this.container.vAlign = 'top'
    this.container.hAlign = 'right'
    this.container.width = this.image.sourceWidth*0.55
    this.container.height = this.image.height
    this.container.positionX = -20
    //this.container.color = new Color4(1,1,1,0.5)
    this.container.adaptHeight = false
    this.container.adaptWidth = false

    let titleContainer = new UIContainerRect(this.container)
    titleContainer.positionY = "-2.5%"
    titleContainer.positionX = "2.5%"
    titleContainer.vAlign = 'top'
    titleContainer.hAlign = 'left'
    titleContainer.width = "87%"
    titleContainer.height = "8%"
    //titleContainer.color = new Color4(0,0,0,0.5)
    titleContainer.adaptHeight = false
    titleContainer.adaptWidth = false

    this.titleShape = new UIText(titleContainer)
    this.titleShape.hTextAlign = 'left'
    this.titleShape.vTextAlign = 'center'
    this.titleShape.height = "98%"
    this.titleShape.width = "92%"
    this.titleShape.color = Color4.White()
    //this.updateTitle("Decentraland MANA sale startBlock")
    this.titleShape.textWrapping = true

    let autorContainer = new UIContainerRect(this.container)
    autorContainer.positionY = "-11%"
    autorContainer.positionX = "4.5%"
    autorContainer.vAlign = 'top'
    autorContainer.hAlign = 'center'
    autorContainer.width = "89%"
    autorContainer.height = "7%"
    //autorContainer.color = new Color4(1,0,0,0.5)
    autorContainer.adaptHeight = false
    autorContainer.adaptWidth = false

    this.autorShape = new UIText(autorContainer)
    this.autorShape.hTextAlign = 'left'
    this.autorShape.vTextAlign = 'center'
    this.autorShape.height = "50%"
    this.autorShape.width = "90%"
    this.autorShape.color = Color4.Black()
    //this.autorShape.value = "Autor name"
    this.autorShape.textWrapping = true
    this.autorShape.fontAutoSize = true


    let textContainer = new UIContainerRect(this.container)
    textContainer.positionY = "-7%"
    textContainer.positionX = "4.5%"
    textContainer.vAlign = 'center'
    textContainer.hAlign = 'center'
    textContainer.width = "89%"
    textContainer.height = "76%"
    //textContainer.color = new Color4(0,0,1,0.5)
    textContainer.adaptHeight = false
    textContainer.adaptWidth = false

    this.textShape = new UIText(textContainer)
    this.textShape.hTextAlign = 'left'
    this.textShape.vTextAlign = 'top'
    this.textShape.height = "95%"
    this.textShape.width = "90%"
    this.textShape.color = Color4.Black()
    //this.textShape.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    this.textShape.fontSize = 14
    this.textShape.textWrapping = true

  }
  show(bShow: boolean){
    this.container.visible = bShow
    this.image.visible = bShow
  }
  private updateTitle(value: string){
    this.titleShape.value = value
    var alpha = clamp((this.titleShape.value.length-20)/20, 0, 1)
    this.titleShape.fontSize = lerp(25,12,alpha)
  }
  setNFTdata(newNFT: NFTdata){
    this.currentNFT = newNFT
    this.updateTitle(newNFT.title)
    this.autorShape.value = newNFT.autor
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
  autor: string
  bDebug: boolean
  constructor(entity: IEntity, smartContract, tokenId, title?: string, autor?: string, description?: string){
    this.entity = entity
    this.smartContract = smartContract
    this.tokenId = tokenId
    const shapeComponent = new NFTShape('ethereum://'+smartContract+'/'+tokenId,Color3.Blue())
    entity.addComponent(shapeComponent)
    this.title = title
    this.description = description
    this.autor = autor
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
