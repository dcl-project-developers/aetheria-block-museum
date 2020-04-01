
@Component('NFTdata')
export class NFTdata{
  entity: IEntity
  smartContract: string
  tokenId: string
  title: string
  description: string
  constructor(entity: IEntity, smartContract, tokenId, title?: string, description?: string){
    this.entity = entity
    this.smartContract = smartContract
    this.tokenId = tokenId
    const shapeComponent = new NFTShape('ethereum://'+smartContract+'/'+tokenId,Color3.Blue())
    entity.addComponent(shapeComponent)
    this.title = title
    this.description = description
  }
}
