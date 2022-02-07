import type { GetStaticProps } from 'next'
import { useEffect } from 'react'

// Where the images are generated
const ENDPOINT = 'http://localhost:2784/'

// <input> references collector
let inputs: { [key: string]: HTMLInputElement } = {}


interface NumberInputProps {
  name: string,
  label?: string,
  default?: number,
}


const NumberInput = (props: NumberInputProps) => {
  useEffect(() => {
    if (props.default) {
      inputs[props.name].value = props.default.toString()
    }
  })
  return (
    <>
      <label htmlFor={props.name} >{props.label || props.name}</label>
      <div>
        <input type="number" id="{props.name}" ref={e => { inputs[props.name] = e! } }/>
      </div>
    </>
  )
}


const DemoPage = (props: { [key: string]: string }) => {
  useEffect(() => {
    let modal = document.getElementById('ImageModal')!
    let image = document.getElementById('Image')! as HTMLImageElement

    // Helper function to generate the endpoint URL
    const pistonUrl = (format: string): string => {
      let params = new URLSearchParams()
      Object.entries(inputs).map(([k, v]) => {
        params.append(k, v.value)
      })
      return ENDPOINT + 'piston.' + format + '?' + params.toString()
    }

    // Modal dialog handling
    import('bootstrap/js/dist/modal.js').then((Modal) => {
      let bsmodal = new Modal.default(modal)
      // Allow to close the dialog with the button
      modal.getElementsByTagName('button')[0]
           .addEventListener('click', (e) => {
        bsmodal.hide()
      })
      // Action handlers
      document.getElementById('PNG')!
              .addEventListener('click', (e) => {
        image.src = pistonUrl('png')
        bsmodal.show()
      })
      document.getElementById('SVG')!
              .addEventListener('click', (e) => {
        image.src = pistonUrl('svg')
        bsmodal.show()
      })
      document.getElementById('PDF')!
              .addEventListener('click', (e) => {
        window.location.href = pistonUrl('pdf')
      })
    })
  }, [])
  return (
    <div className="contents">
      <form>
        <div className="row mb-3">
          <NumberInput name="A" default={55} label="Length"/>
          <NumberInput name="B" default={20.6} label="Height"/>
        </div>
        <div className="row mb-3">
        </div>
        <div className="row mb-3">
          <NumberInput name="DHOLE" default={2} label="Hole Ø"/>
          <NumberInput name="LHOLE" default={3} label="Hole depth"/>
        </div>
        <div className="row mb-3">
          <NumberInput name="D1" default={9.3} label="Ø1"/>
          <NumberInput name="D2" default={6.5} label="Ø2"/>
          <NumberInput name="LD2" default={7} label="Ø2 length"/>
        </div>
        <div className="row mb-3">
          <NumberInput name="D3" default={13.8} label="Ø3"/>
          <NumberInput name="LD3" default={3.5} label="Ø3 length"/>
          <NumberInput name="CHAMFER" default={0.3} label="Chamfers"/>
        </div>
        <div className="row mb-3">
          <NumberInput name="RD34" default={1} label="D3→D4 fillet"/>
          <NumberInput name="D4" default={6.5}/>
          <NumberInput name="D5" default={4.5} label="Ø5"/>
          <NumberInput name="LD5" default={5} label="Ø5 length"/>
          <NumberInput name="RD56" default={0.2} label="D5→D6 fillet"/>
        </div>
        <div className="row mb-3">
          <NumberInput name="D6" default={7.2} label="Ø6"/>
          <NumberInput name="LD6" default={1} label="Ø6 length"/>
          <NumberInput name="D7" default={2} label="Ø7"/>
          <NumberInput name="LD7" default={0.5} label="Ø7 length"/>
          <NumberInput name="C" default={2} label="Tablet thickness"/>
        </div>
        <div className="row mb-3">
          <NumberInput name="ZGROOVE" default={16} label="Groove position"/>
          <NumberInput name="DGROOVE" default={8.3} label="Groove Ø"/>
          <NumberInput name="LGROOVE" default={1} label="Groove thickness"/>
        </div>
        <p>
          <button type="button" id="PNG">View PNG image</button>&nbsp;
          <button type="button" id="SVG">View SVG image</button>&nbsp;
          <button type="button" id="PDF">Download PDF</button>
        </p>
      </form>
      <div className="modal fade" id="ImageModal" tabIndex={-1} role="dialog" aria-labelledby="ImageLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ImageLabel">Generated dynamically by adg-openresty</h5>
            </div>
            <div className="modal-body">
              <img id="Image" src={ENDPOINT + 'piston.png'} width="1123" height="794" alt="Dynamically generated drawing"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    slug: 'demo',
  }
})

export default DemoPage
