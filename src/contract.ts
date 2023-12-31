import {

  Transfer as TransferEvent ,
  Contract as BoredApeYachtClubContract
} from "../generated/Contract/Contract"
import {
  Ape,
  User
  
} from "../generated/schema"


export function handleTransfer(event: TransferEvent): void {
  let ape = Ape.load(event.params.tokenId.toString());
  if(!ape){
    ape =new Ape(event.params.tokenId.toString());
    ape.creator = event.params.to.toHexString();
    
    let apeContract = BoredApeYachtClubContract.bind(event.address);
    ape.contentURI = apeContract.tokenURI(event.params.tokenId);

  }
  ape.owner = event.params.to.toHexString();
  ape.save();
  let user = User.load(event.params.to.toHexString());
  if(!user){
    user = new User(event.params.to.toHexString());
    user.save();
  }
  
}
