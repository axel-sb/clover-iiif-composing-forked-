import React, { useEffect, useState } from "react";
import Viewer from "@samvera/clover-iiif/viewer";
import {
  Homepage,
  Label,
  Metadata,
  PartOf,
  RequiredStatement,
  SeeAlso,
  Summary,
  Thumbnail,
} from "@samvera/clover-iiif/primitives";
import Slider from "@samvera/clover-iiif/slider";

/*import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";*/

const Work = () => {
  const [manifest, setManifest] = useState();

  const manifestId =
    "https://api.dc.library.northwestern.edu/api/v2/works/0902aed4-0eb0-4ab4-a151-c925493be04e?as=iiif";

  const collectionId = manifest?.partOf[0].id;

  useEffect(() => {
    (async () => {
      const response = await fetch(manifestId);
      const json = await response.json();
      setManifest(json);
    })();
  }, [manifestId]);

  if (!manifest) return <></>;

  return (
    <article>
      <Viewer iiifContent={manifestId} />
      <div>
        <Label label={manifest.label} as="h1" />
        <Summary summary={manifest.summary} as="p" />
        <Metadata metadata={manifest.metadata} />
        <RequiredStatement requiredStatement={manifest.requiredStatement} />
        <PartOf partOf={manifest.partOf} />
        <SeeAlso seeAlso={manifest.seeAlso} />
        <Homepage homepage={manifest.homepage} />
        <Thumbnail thumbnail={manifest.thumbnail} />
      </div>
      {/* {collectionId && <Slider iiifContent={collectionId} />} */}
    </article>
  );
};

export default Work;
