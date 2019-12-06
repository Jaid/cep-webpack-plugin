/** @module cep-webpack-plugin */

import ensureArray from "ensure-array"
import ensureObject from "ensure-object"
import ow from "ow"
import resolveAny from "resolve-any"
import xmlWriter from "xmlbuilder"

import applications from "lib/applications.yml"

const webpackId = "CepWebpackPlugin"

/**
 * @typedef {Object} Options
 * @prop {string} [fileName=CSXS/manifest.xml]
 * @prop {string} identifier
 * @prop {string} [version=1.0.0]
 * @prop {string} title
 * @prop {string} [requiredCefVersion=5.0]
 * @prop {Object<"photoshop"|"illustrator",string|string[]>}
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
      requiredCefVersion: "5.0",
      apps: {
        photoshop: "20.0",
      },
      ...optionsObject,
    }
    ow(this.options.identifier, ow.string.nonEmpty)
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(webpackId, async compilation => {
      const extensionId = `${this.options.identifier}.extension`
      const hosts = []
      for (const [appId, requiredVersion] of Object.entries(this.options.apps)) {
        const app = applications[appId]
        const requiredVersions = ensureArray(requiredVersion)
        if (requiredVersions.length === 1) {
          requiredVersions.push("99.0")
        }
        hosts.push({
          "@Name": app.host,
          "@Version": `[${requiredVersions.join(",")}]`,
        })
      }
      const model = {
        ExtensionManifest: {
          "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "@Version": "5.0",
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
          },
          DispatchInfoList: {
            Extension: {
              "@Id": extensionId,
              DispatchInfo: {
                Resources: {
                  MainPath: "./index.html",
                },
                Lifecycle: {
                  AutoVisible: true,
                },
              },
            },
          },
        },
      }
      const content = xmlWriter.create(model, {encoding: "UTF-8"}).end({pretty: true})
      const fileName = await resolveAny(this.options.fileName)
      compilation.assets[fileName] = {
        source: () => content,
        size: () => content.length,
      }
    })
  }

}