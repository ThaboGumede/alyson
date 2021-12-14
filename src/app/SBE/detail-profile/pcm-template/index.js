import PCMTemplate from 'app/SBE/detail-profile/detail-layout/pcm-template'

const Template = ({ sbeCode, targetCode, positionFromAttribute, allAttributesList, display }) => {
  return (
    <PCMTemplate
      sbeCode={sbeCode}
      targetCode={targetCode}
      positionFromAttribute={positionFromAttribute}
      allAttributesList={allAttributesList}
      display={display}
    />
  )
}

export default Template
