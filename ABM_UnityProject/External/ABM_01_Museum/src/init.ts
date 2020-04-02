import { TagComponent, MovementType, FollowPathMoveComponent, PathFollower, Path, UpdateMovementComponentsSystem } from "./imports/index"

engine.addSystem(new UpdateMovementComponentsSystem())

var pathArray: Path[] = []; //Array of paths to follow

function loadPath() {
  for (const entityId in engine.getEntitiesWithComponent(Path)) {
    if(engine.getEntitiesWithComponent(Path)[entityId].getComponent(Path).pathPoints.length>0){
          pathArray.push(engine.getEntitiesWithComponent(Path)[entityId].getComponent(Path))
    }
  }
}

/*
*   Find and inicialice all PathFollowers & Ghosts
*/
function loadPathFollowers() {
  for (const entityId in engine.getEntitiesWithComponent(PathFollower)) {
    let entity: IEntity = engine.getEntitiesWithComponent(PathFollower)[entityId]


    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i].id==entity.getComponent(PathFollower).pathToFollow) {
          if (entity.getComponent(PathFollower).bAutoActivate) {
              entity.addComponent(new FollowPathMoveComponent(MovementType.Simple, pathArray[i].pathPoints, entity, pathArray[i].pathGlobalSpeed, true, pathArray[i].onFinish, true))
              i = pathArray.length
          }
        }
    }
  }
}

export const loadInit = function(){
  loadPath()
  loadPathFollowers()
}
loadInit()
