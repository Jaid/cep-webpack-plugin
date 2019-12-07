/** @module cep-webpack-plugin */

import ensureObject from "ensure-object"
import ow from "ow"
import resolveAny from "resolve-any"
import xmlWriter from "xmlbuilder"

import applications from "lib/applications.yml"

const webpackId = "CepWebpackPlugin"

/**
 * @typedef {Object} Options
 * @prop {string} fileName=CSXS/manifest.xml
 * @prop {string} identifier
 * @prop {string} version=1.0.0
 * @prop {string} title
 * @prop {string} requiredCefVersion=5.0
 * @prop {Object<"photoshop"|"illustrator"|"indesign"|"incopy"|"premierePro"|"prelude"|"afterEffects"|"animate"|"audition"|"dreamweaver"|"muse"|"bridge"|"rush",string|string[]>} apps={photoshop: "20"}
 * @prop {string} mainPath=./index.html
 * @prop {boolean|PanelOptions} panel=false
 * @prop {boolean} minify=true
 */

/**
 * @typedef {Object} PanelOptions
 * @prop {string} title=this.options.title
 * @prop {number} width=200
 * @prop {number} height=600
 */

/**
 * @class
 */
export default class {

  /**
   * @constructor
   * @param {Options} [options] Plugin options
   */
  constructor(options) {
    const optionsObject = ensureObject(options, "identifier")
    /**
     * @type {Options}
     */
    this.options = {
      fileName: "CSXS/manifest.xml",
      version: "1.0.0",
      title: optionsObject.title || optionsObject.identifier,
      requiredCefVersion: "9.0",
      apps: {
        photoshop: "20",
      },
      mainPath: "./index.html",
      panel: true,
      minify: true,
      ...optionsObject,
    }
    ow(this.options.identifier, ow.string.nonEmpty)
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(webpackId, async compilation => {
      const extensionManifestVersion = "8.0"
      const extensionId = `${this.options.identifier}.extension`
      const hosts = []
      for (const [appId, requiredVersion] of Object.entries(this.options.apps)) {
        const app = applications[appId]
        hosts.push({
          "@Name": app.host,
          "@Version": requiredVersion,
        })
      }
      const model = {
        ExtensionManifest: {
          "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "@Version": extensionManifestVersion,
          "@ExtensionBundleId": this.options.identifier,
          "@ExtensionBundleVersion": this.options.version,
          "@ExtensionBundleName": this.options.title,
          ExtensionList: {
            Extension: {
              "@Id": extensionId,
              "@Version": this.options.version,
            },
          },
          ExecutionEnvironment: {
            RequiredRuntimeList: {
              RequiredRuntime: {
                "@Name": "CSXS",
                "@Version": this.options.requiredCefVersion,
              },
            },
            HostList: {
              Host: hosts,
            },
            LocaleList: {
              Locale: {
                "@Code": "All",
              },
            },
          },
          DispatchInfoList: {
            Extension: {
              "@Id": extensionId,
              DispatchInfo: {
                Resources: {
                  MainPath: this.options.mainPath,
                },
                Lifecycle: {
                  AutoVisible: true,
                },
              },
            },
          },
        },
      }
      if (this.options.panel) {
        const panelOptions = {
          title: this.options.title,
          height: 600,
          width: 200,
        }
        model.ExtensionManifest.DispatchInfoList.Extension.DispatchInfo.UI = {
          Type: "Panel",
          Menu: panelOptions.title,
          Geometry: {
            Size: {
              Height: panelOptions.height,
              Width: panelOptions.width,
            },
          },
        }
      }
      const content = xmlWriter.create(model, {encoding: "UTF-8"}).end({pretty: !this.options.minify})
      const fileName = await resolveAny(this.options.fileName)
      compilation.assets[fileName] = {
        source: () => content,
        size: () => content.length,
      }
    })
  }

}