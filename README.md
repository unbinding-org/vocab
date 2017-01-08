# unbinding vocab

> "The vision of the Semantic Web is to allow everybody to publish interlinked machine-processable information with the ease of publishing a web page."

this project is a collection of software & documentation that supports the building of vocabularies of useful ideas, concepts and categories from the pali canon & theravadin buddhist teachers.

the goal: to abstract concepts out of opinions so a person in training can, at a glance, understand the nuances between their different interpretations.

the project currently includes the following sub-projects:
- a web server that publishes ontologies & vocabularies

## Rationale

For rationale on why to use RDF as a data model, check out [this](https://www.w3.org/TR/rdf11-primer/#section-use-cases) section of the RDF Primer.

Because serialized RDF usually exist as static assets they can't be dynamically modified. As such, one of the projects is to create web interfaces to create those changes.

## Setup

```bash
mkdir .db   # make sure you have a .db folder
```

## References

- [levelgraph](http://nodejsconfit.levelgraph.io/)
- [hexastores](http://people.csail.mit.edu/tdanford/6830papers/weiss-hexastore.pdf)
- [owl2 primer](https://www.w3.org/TR/2012/REC-owl2-primer-20121211/)

