export class DonorsTable {
    name?:string;
    id?:number;
    address?: string;
    questioner?: number;
    age?: number;
    distance?:string;
    smoking?: number;
    duration?:string;
    duration_v?:number;
    score?:number;
    distance_v?:number;

    constructor(name,id,address,questioner,age,distance,smoking,duration,duration_v,score,distance_v){
      this.name=name;
      this.id=id;
      this.address=address;
      this.questioner=questioner;
      this.age=age;
      this.distance=distance;
      this.smoking=smoking;
      this.duration=duration;
      this.duration_v=duration_v;
      this.score=score;
      this.distance_v=distance_v;

  }
  }