import PCMTemplate from 'app/SBE/detail-profile/detail-layout/pcm-template'

const Template = ({ sbeCode, targetCode, positionFromAttribute, allAttributesList }) => {
  return (
    <PCMTemplate
      sbeCode={sbeCode}
      targetCode={targetCode}
      positionFromAttribute={positionFromAttribute}
      allAttributesList={allAttributesList}
    />
  )
}

export default Template
