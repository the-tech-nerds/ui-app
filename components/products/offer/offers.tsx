import React, {useEffect, useState} from "react";
import {Offer} from "../../../types";
import {OfferItem} from "./offer-item";
import Button from "../../common/buttons/button";
type OfferProps = {
     fetchUrl: string;
}
const ActiveOffers =(props: OfferProps) =>{
     const [offers, setOffers] = useState<Offer[]>([]);
     const [loading, setLoading] = useState(false);
     const [baseUrl, setBaseUrl] = useState(null);
     const [nextUrl, setNextUrl] = useState(undefined);
     const [loadMore, setLoadMore] = useState(true);
     const [fetched, setFetched] = useState<Record<string, true | undefined>>({});
     useEffect(() => {
          if (props.fetchUrl !== baseUrl) {
               setBaseUrl(props.fetchUrl);
               setOffers([]);
               setLoading(false);
               setFetched({});
          } else {
                fetchData();
          }
     }, [props.fetchUrl, baseUrl]);
     const fetchData = async () => {
               const url = nextUrl ? `${baseUrl}${nextUrl}` : baseUrl;
               if (!fetched[url]) {
                    setLoading(true);
                    fetch(url)
                        .then(res => res.json())
                        .then(res => {
                             setFetched({ ...fetched, [url] : true });
                             if (res.code === 200) {
                                  setOffers([...offers, ...res.data.results]);
                                  const next = res.data.links.next;
                                  setNextUrl(next);
                             }
                             setLoading(false);
                        }).catch(e => setLoading(false))
               } else{
                    setLoadMore(false);
               }
     };
     const items = offers
         .map((offer) =>
             <OfferItem
                 key={offer.slug}
                 offer={offer}
             />
         );
     if (!offers.length) {
          return (
              <section className="ratio_asos section-b-space top-spacing--lg">
                   <div className="container">
                        <h4>No offers available!</h4>
                   </div>
              </section>
          )
     }
     return <div  key={props.fetchUrl}>
          <section className="ratio_asos section-b-space top-spacing--lg">
               <div className="container">
                    <div className="d-flex">
                         <div className="flex-fill"><hr/></div>
                         <div className="ml-4 mr-4 font-weight-bold">Offers</div>
                         <div className="flex-fill"><hr/></div>
                    </div>
                         <div className= "row">
                              {items}
                         </div>
                    {loadMore && <div className= "row d-flex justify-content-center">
                         <Button onClick={fetchData}  loading={loading} disabled={loading}>Load More</Button>
                    </div> }

               </div>
          </section>
     </div>
}

export default  ActiveOffers;
