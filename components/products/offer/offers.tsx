import React from "react";
import {Offer} from "../../../types";
type OfferProps = {
     offers: Offer[];
}
const ActiveOffers =(props: OfferProps) =>{
     const {offers } = props;
     return <div>
          <section className="ratio_asos section-b-space top-spacing--lg">
               <div className="container">
                    <h4>No products available!</h4>
               </div>
          </section>
     </div>
}

export default  ActiveOffers;
